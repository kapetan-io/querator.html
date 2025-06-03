---
sidebar_position: 4
---

# Usage

```bash
# Verify Querator is running
curl http://localhost:2319/health
```

## Create A Queue

```bash
curl -X POST http://localhost:2319/v1/queue.create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "welcome-queue",
    "dead_queue": "welcome-queue-dead",
    "reference": "tutorial-user",
    "lease_timeout": "60s",
    "dead_timeout": "24h",
    "max_attempts": 3,
    "requested_partitions": 1
  }'
```

**Expected Response:**
```json
{
  "code": 200
}
```

**Queue Configuration Explained:**
- `name`: Unique identifier for your queue
- `dead_queue`: Where failed items go after max attempts
- `reference`: User-defined metadata (useful for organizing queues)
- `lease_timeout`: How long a consumer has to process an item
- `dead_timeout`: Maximum time an item can exist before moving to dead queue
- `max_attempts`: Number of retry attempts before marking as dead
- `requested_partitions`: Number of partitions for horizontal scaling

## Produce Items to the Queue

Add some work items to your queue:

```bash
curl -X POST http://localhost:2319/v1/queue.produce \
  -H "Content-Type: application/json" \
  -d '{
    "queue_name": "welcome-queue",
    "request_timeout": "30s",
    "items": [
      {
        "encoding": "application/json",
        "kind": "welcome-email",
        "reference": "user-123",
        "utf8": "{\"email\": \"user@example.com\", \"name\": \"Alice\"}"
      },
      {
        "encoding": "application/json", 
        "kind": "welcome-email",
        "reference": "user-456",
        "utf8": "{\"email\": \"bob@example.com\", \"name\": \"Bob\"}"
      },
      {
        "encoding": "application/json",
        "kind": "notification",
        "reference": "admin",
        "utf8": "{\"message\": \"2 new users registered\"}"
      }
    ]
  }'
```

**Expected Response:**
```json
{
  "code": 200
}
```

**Item Fields Explained:**
- `encoding`: Content type of the payload
- `kind`: Type of work item (helps consumers route processing)
- `reference`: User-defined identifier for tracking/filtering
- `utf8`: The actual payload data as UTF-8 string

## Lease Items for Processing

Consumers lease items to gain exclusive processing rights:

```bash
curl -X POST http://localhost:2319/v1/queue.lease \
  -H "Content-Type: application/json" \
  -d '{
    "queue_name": "welcome-queue",
    "client_id": "worker-1", 
    "batch_size": 2,
    "request_timeout": "30s"
  }'
```

**Expected Response:**
```json
{
  "items": [
    {
      "id": "2m75RTp9PBx69hw1Q7mjoB0F73Q",
      "encoding": "application/json",
      "kind": "welcome-email", 
      "reference": "user-123",
      "attempts": 0,
      "lease_deadline": "2024-12-06T15:30:49.366215Z",
      "bytes": "eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIiwgIm5hbWUiOiAiQWxpY2UifQ=="
    },
    {
      "id": "2m75RTp9PBx69hw1Q7mjoB0F73R", 
      "encoding": "application/json",
      "kind": "welcome-email",
      "reference": "user-456", 
      "attempts": 0,
      "lease_deadline": "2024-12-06T15:30:49.366215Z",
      "bytes": "eyJlbWFpbCI6ICJib2JAZXhhbXBsZS5jb20iLCAibmFtZSI6ICJCb2IifQ=="
    }
  ],
  "queue_name": "welcome-queue",
  "partition": 0
}
```

**Lease Response Explained:**
- `id`: Unique identifier for this specific item
- `lease_deadline`: When the lease expires (item returns to queue)
- `attempts`: Number of times this item has been processed
- `bytes`: Base64-encoded payload data

## Process and Complete Items

After processing items successfully, mark them as complete:

```bash
curl -X POST http://localhost:2319/v1/queue.complete \
  -H "Content-Type: application/json" \
  -d '{
    "queue_name": "welcome-queue",
    "partition": 0,
    "request_timeout": "30s", 
    "ids": [
      "2m75RTp9PBx69hw1Q7mjoB0F73Q",
      "2m75RTp9PBx69hw1Q7mjoB0F73R"
    ]
  }'
```

**Expected Response:**
```json
{
  "code": 200
}
```

## Handle Failed Items

If processing fails, you can retry items or mark them as dead:

### Option A: Retry Later
```bash
curl -X POST http://localhost:2319/v1/queue.retry \
  -H "Content-Type: application/json" \
  -d '{
    "queue_name": "welcome-queue",
    "partition": 0,
    "items": [
      {
        "id": "item-id-that-failed",
        "enqueue_at": "2024-12-06T16:00:00Z",
        "dead": false
      }
    ]
  }'
```

### Mark as Dead
```bash
curl -X POST http://localhost:2319/v1/queue.retry \
  -H "Content-Type: application/json" \
  -d '{
    "queue_name": "welcome-queue", 
    "partition": 0,
    "items": [
      {
        "id": "item-id-that-failed",
        "enqueue_at": "2024-12-06T15:30:00Z",
        "dead": true
      }
    ]
  }'
```

## Monitor Your Queue

Check queue statistics:

```bash
curl -X POST http://localhost:2319/v1/queue.stats \
  -H "Content-Type: application/json" \
  -d '{
    "queue_name": "welcome-queue"
  }'
```

**Expected Response:**
```json
{
  "queue_name": "welcome-queue",
  "logical_queues": [
    {
      "produce_waiting": 0,
      "lease_waiting": 0, 
      "complete_waiting": 0,
      "lease_blocked": 0,
      "in_flight": 0,
      "partitions": [
        {
          "partition": 0,
          "total": 1,
          "total_leased": 0,
          "average_age": "2m15s"
        }
      ]
    }
  ]
}
```

## List All Queues

See all queues in your system:

```bash
curl -X POST http://localhost:2319/v1/queue.list \
  -H "Content-Type: application/json" \
  -d '{
    "pivot": "",
    "limit": 10
  }'
```

## Common Patterns

### 1. Worker Loop Pattern
```bash
#!/bin/bash
WORKER_ID="worker-$$"
QUEUE_NAME="welcome-queue"

while true; do
  # Lease items
  RESPONSE=$(curl -s -X POST http://localhost:2319/v1/queue.lease \
    -H "Content-Type: application/json" \
    -d "{
      \"queue_name\": \"$QUEUE_NAME\",
      \"client_id\": \"$WORKER_ID\",
      \"batch_size\": 5,
      \"request_timeout\": \"30s\"
    }")
  
  # Process items (implementation specific)
  # ... your processing logic here ...
  
  # Complete processed items
  IDS=$(echo "$RESPONSE" | jq -r '.items[].id' | tr '\n' ',' | sed 's/,$//')
  if [ ! -z "$IDS" ]; then
    curl -s -X POST http://localhost:2319/v1/queue.complete \
      -H "Content-Type: application/json" \
      -d "{
        \"queue_name\": \"$QUEUE_NAME\",
        \"partition\": 0,
        \"request_timeout\": \"30s\",
        \"ids\": [\"$(echo $IDS | sed 's/,/","/g')\"]
      }"
  fi
  
  # Brief pause before next iteration
  sleep 1
done
```

### 2. Scheduled Processing
```bash
# Schedule an item to be processed in 1 hour
FUTURE_TIME=$(date -u -d '+1 hour' '+%Y-%m-%dT%H:%M:%SZ')

curl -X POST http://localhost:2319/v1/queue.produce \
  -H "Content-Type: application/json" \
  -d "{
    \"queue_name\": \"scheduled-queue\",
    \"request_timeout\": \"30s\",
    \"items\": [{
      \"encoding\": \"application/json\",
      \"kind\": \"scheduled-task\",
      \"reference\": \"maintenance\",
      \"utf8\": \"{\\\"action\\\": \\\"cleanup\\\", \\\"scheduled_at\\\": \\\"$FUTURE_TIME\\\"}\",
      \"enqueue_at\": \"$FUTURE_TIME\"
    }]
  }"
```