---
sidebar_position: 2
---

# Quick Start Guide

This guide will walk you through installation and creating your first queue, producing items, and processing them with Querator.

# Installation

Querator supports multiple deployment options to fit your infrastructure needs.

### Pre-built Binary

Download the latest release

```bash
TODO: Setup brew install, and go install
```

### Build from Source

```bash
# Clone the repository
git clone https://github.com/kapetan-io/querator.git
cd querator

# Build the binary
go build -o querator ./cmd/querator

# Run Querator
./querator --help
```

### Docker

```bash
# Pull the official image
docker pull kapetan/querator:latest

# Run with in-memory storage
docker run -p 2319:2319 kapetan/querator:latest
```


## Step 1: Create Your First Queue

```bash
curl -X POST http://localhost:2319/v1/queue.create \
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
## Step 2: Produce Items to the Queue

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
      }
    ]
  }'
```

## Step 3: Lease Items for Processing

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
    }
  ],
  "queue_name": "welcome-queue",
  "partition": 0
}
```

## Step 4: Process and Complete Items

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
    ]
  }'
```

## Next Steps

- **[Usage Guide](usage.md)** - Advanced usage guide
- **[Configuration Guide](configuration.md)** - Advanced configuration options
- **[Architecture Overview](/docs/architecture/intro)** - Understanding Querator's design
- **[API Reference](/api)** - Complete API documentation