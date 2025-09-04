#!/bin/bash

# Test script to verify deployment and create sample data
# Usage: ./scripts/test-ingestion.sh SERVICE_URL CRON_TOKEN

SERVICE_URL=$1
CRON_TOKEN=$2

if [ -z "$SERVICE_URL" ] || [ -z "$CRON_TOKEN" ]; then
  echo "Usage: ./scripts/test-ingestion.sh SERVICE_URL CRON_TOKEN"
  exit 1
fi

echo "🧪 Testing Zaza Trends Worker"
echo "============================"
echo "Service URL: $SERVICE_URL"
echo ""

# Health check
echo "1️⃣ Health check..."
curl -s "$SERVICE_URL/health" | jq '.' || echo "Health check failed"
echo ""

# Trigger ingestion
echo "2️⃣ Triggering manual ingestion (this will take 30-60 seconds)..."
RESPONSE=$(curl -s "$SERVICE_URL/cron/ingest?token=$CRON_TOKEN")
echo "$RESPONSE" | jq '.' || echo "$RESPONSE"
echo ""

# Wait for ingestion to complete
echo "⏳ Waiting for data processing..."
sleep 5

# Check trends
echo "3️⃣ Fetching latest trends..."
curl -s "$SERVICE_URL/debug/trends" | jq '.' || echo "Failed to fetch trends"
echo ""

# Export sample data
echo "4️⃣ Exporting sample data..."
curl -s "$SERVICE_URL/debug/export" > trends-sample.json
echo "Sample data saved to trends-sample.json"
echo ""

echo "✅ Test completed!"
echo ""
echo "📊 Check Firestore collections:"
echo "   - raw_items: Source content from RSS feeds"
echo "   - trend_signals: Analyzed trends with sentiment"
echo ""
echo "🔍 View in console:"
echo "   https://console.cloud.google.com/firestore/data?project=zaza-trends-dev"