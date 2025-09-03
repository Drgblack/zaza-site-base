#!/bin/bash

# Setup Google Cloud Secret Manager secrets for Zaza Trends Worker
# Usage: ./deploy/setup-secrets.sh [PROJECT_ID]

set -e

PROJECT_ID=${1:-"your-project-id"}

echo "🔐 Setting up Secret Manager secrets"
echo "===================================="
echo "Project ID: $PROJECT_ID"
echo ""

# Set the project
gcloud config set project $PROJECT_ID

echo "📝 Creating secrets (you'll be prompted for values)..."

# Required secrets
echo -n "Enter CRON_TOKEN (secure random string): "
read -s CRON_TOKEN
echo ""
gcloud secrets create cron-token --data-file=<(echo -n "$CRON_TOKEN") || \
gcloud secrets versions add cron-token --data-file=<(echo -n "$CRON_TOKEN")

# Optional Reddit API secrets
echo -n "Enter REDDIT_CLIENT_ID (or press Enter to skip): "
read REDDIT_CLIENT_ID
if [ ! -z "$REDDIT_CLIENT_ID" ]; then
    gcloud secrets create reddit-client-id --data-file=<(echo -n "$REDDIT_CLIENT_ID") || \
    gcloud secrets versions add reddit-client-id --data-file=<(echo -n "$REDDIT_CLIENT_ID")
    
    echo -n "Enter REDDIT_CLIENT_SECRET: "
    read -s REDDIT_CLIENT_SECRET
    echo ""
    gcloud secrets create reddit-client-secret --data-file=<(echo -n "$REDDIT_CLIENT_SECRET") || \
    gcloud secrets versions add reddit-client-secret --data-file=<(echo -n "$REDDIT_CLIENT_SECRET")
    
    echo -n "Enter REDDIT_USERNAME: "
    read REDDIT_USERNAME
    gcloud secrets create reddit-username --data-file=<(echo -n "$REDDIT_USERNAME") || \
    gcloud secrets versions add reddit-username --data-file=<(echo -n "$REDDIT_USERNAME")
    
    echo -n "Enter REDDIT_PASSWORD: "
    read -s REDDIT_PASSWORD
    echo ""
    gcloud secrets create reddit-password --data-file=<(echo -n "$REDDIT_PASSWORD") || \
    gcloud secrets versions add reddit-password --data-file=<(echo -n "$REDDIT_PASSWORD")
fi

# Optional Twitter API secret
echo -n "Enter TWITTER_BEARER_TOKEN (or press Enter to skip): "
read -s TWITTER_BEARER_TOKEN
echo ""
if [ ! -z "$TWITTER_BEARER_TOKEN" ]; then
    gcloud secrets create twitter-bearer-token --data-file=<(echo -n "$TWITTER_BEARER_TOKEN") || \
    gcloud secrets versions add twitter-bearer-token --data-file=<(echo -n "$TWITTER_BEARER_TOKEN")
fi

# Optional Facebook API secrets
echo -n "Enter FACEBOOK_APP_ID (or press Enter to skip): "
read FACEBOOK_APP_ID
if [ ! -z "$FACEBOOK_APP_ID" ]; then
    gcloud secrets create facebook-app-id --data-file=<(echo -n "$FACEBOOK_APP_ID") || \
    gcloud secrets versions add facebook-app-id --data-file=<(echo -n "$FACEBOOK_APP_ID")
    
    echo -n "Enter FACEBOOK_APP_SECRET: "
    read -s FACEBOOK_APP_SECRET
    echo ""
    gcloud secrets create facebook-app-secret --data-file=<(echo -n "$FACEBOOK_APP_SECRET") || \
    gcloud secrets versions add facebook-app-secret --data-file=<(echo -n "$FACEBOOK_APP_SECRET")
fi

echo ""
echo "✅ Secret setup completed!"
echo "========================="
echo "🔍 List all secrets: gcloud secrets list"
echo "👀 View secret versions: gcloud secrets versions list SECRET_NAME"