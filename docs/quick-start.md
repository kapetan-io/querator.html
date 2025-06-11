---
sidebar_position: 2
---

# Quick Start Guide

This guide will walk you through installation and creating your first queue, producing items, and processing them with Querator.

# Installation

Querator supports multiple deployment options to fit your infrastructure needs.

### Pre-built Binary

Download the latest release via homebrew

```bash
 brew tap kapetan-io/kapetan
 brew install querator
```
Install via golang install
```bash
 go install github.com/kapetan-io/querator/cmd/querator@latest
```

### Build a Release from source

```bash
 git clone https://github.com/kapetan-io/querator.git
 cd querator
 git checkout v0.0.1
 make build

 # Run Querator
 ./querator --version
 Version: v0.0.1
```

### Docker

```bash
# Pull the official image
docker pull ghcr.io/kapetan-io/querator:latest

# Run with in-memory storage
docker run ghcr.io/kapetan-io/querator:latest
```


## Step 1: Create Your First Queue

```bash
querator create my-queue
```

This is the equivalent to calling the following

```json
curl -X POST http://localhost:2319/v1/queues.create \
  -H "Content-Type: application/json" \
  -d '{
    "queue_name": "my-queue",
    "lease_timeout": "1m",
    "expire_timeout": "60m",
    "requested_partitions": 1
  }'
```
## Step 2: Produce Items to the Queue

```bash
echo -en "{\"name\": \"Alice\"}" | querator produce my-queue 
```

The equivalent curl command

```json
curl -X POST http://localhost:2319/v1/queue.produce \
  -H "Content-Type: application/json" \
  -d '{
    "queue_name": "my-queue",
    "request_timeout": "30s",
    "items": [
      {
        "utf8": "{\"name\": \"Alice\"}"
      }
    ]
  }'
```

## Step 3: Lease Items for Processing

Consumers lease items to gain exclusive processing rights:

```bash
querator lease my-queue
```

```json
curl -X POST http://localhost:2319/v1/queue.lease \
  -H "Content-Type: application/json" \
  -d '{
    "queue_name": "my-queue",
    "client_id": "id-20323092", 
    "batch_size": 1,
    "request_timeout": "30s"
  }'
```

**Expected Response:**
> NOTE: When using application/json encoding, the payload `bytes` are encoded using base64. However, when using
> application/protobuf encoding (which is recommended for non-trivial operation) the payload `bytes` are not base64
> encoded. We only use base64 encoding as the payload could be binary data that needs to be preserved in JSON.
```json
{
  "items": [
    {
      "id": "2m75RTp9PBx69hw1Q7mjoB0F73Q",
      "attempts": 0,
      "lease_deadline": "2024-12-06T15:30:49.366215Z",
      "bytes": "eyJlbWFpbCI6ICJ1c2VyQGV4YW1wbGUuY29tIiwgIm5hbWUiOiAiQWxpY2UifQ=="
    }
  ],
  "queue_name": "my-queue",
  "partition": 0
}
```

## Step 4: Process and Complete Items

After processing items successfully, mark them as complete:

```bash
querator complete my-queue --partition=0 2m75RTp9PBx69hw1Q7mjoB0F73Q
```

```json
curl -X POST http://localhost:2319/v1/queue.complete \
  -H "Content-Type: application/json" \
  -d '{
    "queue_name": "my-queue",
    "partition": 0,
    "request_timeout": "30s", 
    "ids": [
      "2m75RTp9PBx69hw1Q7mjoB0F73Q"
    ]
  }'
```

## Next Steps

- **[Configuration Guide](configuration.md)** - Advanced configuration options
- **[Architecture Overview](architecture.md)** - Understanding Querator's design
- **[API Reference](/api)** - Complete API documentation