#!/bin/bash

# Deployment script for europe-west4 (eur3 multi-region)
# Project: zaza-trends-dev

set -e

PROJECT_ID="zaza-trends-dev"
REGION="europe-west4"
SERVICE_NAME="zaza-trends"

echo "🚀 Deploying Zaza Trends Worker to europe-west4"
echo "=============================================="
echo "Project: $PROJECT_ID"
echo "Region: $REGION (eur3 multi-region)"
echo ""

# Set project
gcloud config set project $PROJECT_ID

# Enable required services
echo "⚙️  Enabling required APIs..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com \
  cloudscheduler.googleapis.com firestore.googleapis.com secretmanager.googleapis.com \
  logging.googleapis.com

# Create service account
echo "👤 Creating service account..."
gcloud iam service-accounts create zaza-trends-sa \
  --description="Service account for Zaza Trends Worker" \
  --display-name="Zaza Trends Service Account" 2>/dev/null || echo "Service account already exists"

# Grant Firestore permissions
echo "🔐 Setting up permissions..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:zaza-trends-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/datastore.user"

# Grant Secret Manager access
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:zaza-trends-sa@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

# Create secrets with placeholders
echo "🔑 Creating placeholder secrets..."
echo "placeholder-reddit-id" | gcloud secrets create reddit-client-id --data-file=- 2>/dev/null || echo "Secret already exists"
echo "placeholder-reddit-secret" | gcloud secrets create reddit-client-secret --data-file=- 2>/dev/null || echo "Secret already exists"
echo "placeholder-reddit-user" | gcloud secrets create reddit-username --data-file=- 2>/dev/null || echo "Secret already exists"
echo "placeholder-reddit-pass" | gcloud secrets create reddit-password --data-file=- 2>/dev/null || echo "Secret already exists"
echo "placeholder-twitter-token" | gcloud secrets create twitter-bearer-token --data-file=- 2>/dev/null || echo "Secret already exists"
echo "placeholder-fb-id" | gcloud secrets create facebook-app-id --data-file=- 2>/dev/null || echo "Secret already exists"
echo "placeholder-fb-secret" | gcloud secrets create facebook-app-secret --data-file=- 2>/dev/null || echo "Secret already exists"

# Generate CRON_TOKEN
CRON_TOKEN=$(openssl rand -hex 32)
echo "$CRON_TOKEN" | gcloud secrets create cron-token --data-file=- 2>/dev/null || \
  echo "$CRON_TOKEN" | gcloud secrets versions add cron-token --data-file=-

# Deploy to Cloud Run
echo "☁️  Deploying to Cloud Run in europe-west4..."
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --service-account zaza-trends-sa@$PROJECT_ID.iam.gserviceaccount.com \
  --set-env-vars GOOGLE_CLOUD_PROJECT_ID=$PROJECT_ID \
  --set-secrets="REDDIT_CLIENT_ID=reddit-client-id:latest,REDDIT_CLIENT_SECRET=reddit-client-secret:latest,REDDIT_USERNAME=reddit-username:latest,REDDIT_PASSWORD=reddit-password:latest,TWITTER_BEARER_TOKEN=twitter-bearer-token:latest,FACEBOOK_APP_ID=facebook-app-id:latest,FACEBOOK_APP_SECRET=facebook-app-secret:latest,CRON_TOKEN=cron-token:latest" \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --timeout 1800 \
  --max-instances 10 \
  --min-instances 0

# Get service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

# Create Cloud Scheduler job
echo "⏰ Creating Cloud Scheduler job..."
gcloud scheduler jobs create http zaza-trends-ingest \
  --location=$REGION \
  --schedule="0 6 * * 1,3,5" \
  --uri="$SERVICE_URL/cron/ingest?token=$CRON_TOKEN" \
  --http-method=GET \
  --time-zone="Europe/Berlin" \
  --max-retry-attempts=3 \
  --description="Trend ingestion Mon/Wed/Fri at 06:00 CET" 2>/dev/null || echo "Scheduler job already exists"

echo ""
echo "✅ Deployment completed!"
echo "======================="
echo "🌐 Service URL: $SERVICE_URL"
echo "📊 Health check: $SERVICE_URL/health"
echo "🔍 Debug trends: $SERVICE_URL/debug/trends"
echo "📥 Manual test: $SERVICE_URL/cron/ingest?token=$CRON_TOKEN"
echo ""
echo "🔐 CRON_TOKEN stored in Secret Manager"
echo ""
echo "📝 To run manual ingestion test:"
echo "   curl '$SERVICE_URL/cron/ingest?token=$CRON_TOKEN'"
echo ""
echo "📊 To check Firestore data:"
echo "   Visit: https://console.cloud.google.com/firestore/data?project=$PROJECT_ID"