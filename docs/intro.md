---
sidebar_position: 1
---

# Introduction

A Reservation based FIFO queue backed by a Database with Almost Exactly Once Delivery semantics. We say,
“almost” because Exactly Once Delivery (EOD) is theoretically impossible.

HOWEVER, In practice you can 
achieve AEOD or “Almost Exactly Once Delivery” which is just EOD with the understanding that you have the
occasional duplicate delivery due to some failure of the system. In our experience, the duplicate delivery
& processing rate is very low indeed. When I say “very low” I mean, it has about the same failure rate of
whatever your current uptime is. That is to say, message delivery is about as reliable as the system it
runs on. If you need additional protection against duplication, you can ensure the messages consumed are 
idempotent. Remember, Distributed systems are all about trade-offs

## Getting Started

TODO: high level examples of using the HTTP/JSON API

```bash
curl http://localhost:2319/queue.produce --json
```

## Installation

TODO

## API Reference
See [OpenAPI Spec](/api)
