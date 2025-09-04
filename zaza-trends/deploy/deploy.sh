#!/bin/bash

# Zaza Trends Worker Deployment Script
# Usage: ./deploy/deploy.sh [PROJECT_ID]

set -e

PROJECT_ID=${1:-"your-project-id"}
REGION=${2:-"europe-west1"}
SERVICE_NAME="zaza-trends"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🚀 Deploying Zaza Trends Worker"
echo "================================"
echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"
echo "Service: $SERVICE_NAME"
echo ""

# Check if gcloud is installed and authenticated
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Please install Google Cloud SDK."
    exit 1
fi

# Set the project
echo "📋 Setting project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo "⚙️  Enabling required APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable cloudscheduler.googleapis.com
gcloud services enable secretmanager.googleapis.com

# Create service account
echo "👤 Creating service account..."
gcloud iam service-accounts create zaza-trends-sa \
    --description="Service account for Zaza Trends Worker" \
    --display-name="Zaza Trends Service Account" || true

# Grant necessary permissions
echo "🔐 Setting up permissions..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:zaza-trends-sa@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/datastore.user"

# Build and push Docker image
echo "🐳 Building Docker image..."
docker build -t $IMAGE_NAME .
docker push $IMAGE_NAME

# Deploy to Cloud Run using YAML config
echo "☁️  Deploying to Cloud Run..."
# Replace placeholders in the YAML config
sed "s/your-project-id/$PROJECT_ID/g" deploy/cloud-run.yaml > deploy/cloud-run-temp.yaml
gcloud run services replace deploy/cloud-run-temp.yaml --region=$REGION
rm deploy/cloud-run-temp.yaml

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

# Create Cloud Scheduler job
echo "⏰ Setting up Cloud Scheduler..."
# Generate a random CRON_TOKEN if not provided
CRON_TOKEN=${CRON_TOKEN:-$(openssl rand -hex 32)}

# Replace placeholders in scheduler config
sed "s|your-project-id|$PROJECT_ID|g; s|your-hash-ew|$(echo $SERVICE_URL | cut -d'/' -f3 | cut -d'.' -f1)|g; s/YOUR_CRON_TOKEN/$CRON_TOKEN/g" deploy/scheduler.json > deploy/scheduler-temp.json

# Create the scheduler job
gcloud scheduler jobs create http zaza-trends-ingest \
    --location=$REGION \
    --schedule="0 6 * * 1,3,5" \
    --uri="$SERVICE_URL/cron/ingest?token=$CRON_TOKEN" \
    --http-method=GET \
    --time-zone="Europe/Berlin" \
    --max-retry-attempts=3 \
    --description="Scheduled trend ingestion for Zaza AI" || true

rm deploy/scheduler-temp.json

echo ""
echo "✅ Deployment completed successfully!"
echo "=================================="
echo "🌐 Service URL: $SERVICE_URL"
echo "🔍 Health check: $SERVICE_URL/health"
echo "📊 Debug trends: $SERVICE_URL/debug/trends"
echo "📥 Manual ingest: $SERVICE_URL/cron/ingest?token=$CRON_TOKEN"
echo ""
echo "🔐 IMPORTANT: Store this CRON_TOKEN securely: $CRON_TOKEN"
echo ""
echo "📝 Next steps:"
echo "   1. Store API credentials in Secret Manager:"
echo "      gcloud secrets create cron-token --data-file=<(echo -n '$CRON_TOKEN')"
echo "   2. Test the service with: curl $SERVICE_URL/health"
echo "   3. Monitor logs with: gcloud logging read 'resource.type=\"cloud_run_revision\"'"