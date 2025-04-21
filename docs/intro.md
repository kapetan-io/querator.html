---
sidebar_position: 1
---

# Introduction

Querator is a **Distributed Durable Execution System** built on top of an **Almost Exactly Once Delivery**
(AEOD) Queue.

Querator addresses both **Durable Execution** and **Exactly Once Delivery Queues**, which together form a
symbiotic relationship that enables developers to build event-driven, highly resilient, distributed,
high-performance applications.

### Durable Execution With Querator
TODO: Details on this are still evolving.

### Exactly Once Delivery With Querator
At the heart of Querator is the Almost Exactly Once Delivery FIFO queue, backed by a database of your choice.

We say **“Almost” Exactly Once** because [Exactly Once Delivery (EOD) is theoretically impossible](https://bravenewgeek.com/you-cannot-have-exactly-once-delivery/).
However, in practice, you can achieve AEOD—or “Almost Exactly Once Delivery”—which is functionally equivalent to EOD,
with the understanding that occasional duplicate deliveries may occur due to system failures.

From our extensive experience operating EOD systems at scale, the likelihood of duplicate delivery and processing
is about the same as your system’s overall failure rate. In other words, message delivery is only as reliable as
the system it runs on. Remember, [Distributed systems are all
about trade-offs](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/).

Anyone claiming their system provides, precise EOD is being disingenuous at best.

#### Exactly Once with Lease
Unlike streaming or other queue systems, Querator is designed from the ground up to provide high throughput
access to items in the queue via a [Lease](https://en.wikipedia.org/wiki/Lease_(computer_science)). When a consumer
pulls an item off the queue there is an implicit **lease** created between the consumer and Querator. The
consumer gains exclusive right to process that item, until such time as they mark the item as **complete**
or tell Querator to **retry** the item by releasing the **lease** and giving the item to another consumer
immediately, or at some future date and time.

The concept of a **lease** provides users of Querator with proof the item was delivered and provides assurances
that the item was processed by the consumer! In this way, you can sort of think of a **lease** as a locking
primitive for processing items. A Consumer can hold on to the lease until the agreed upon timeout, it can hold
off marking the lease as complete until it has processed the item that it consumed. As a result, you can use the
locking primitive the lease provides to solve several distributed problems.

- Implement multi-step, durable execution functions.
- Implement the Saga Pattern for distributed transactions
- Use it as a FIFO queue with ordered delivery of messages
- Use it as a limit locking system, where items in the queue represent a limited lockable resource

#### Scheduled Delivery
Querator also supports scheduled delivery of the item queued. Given a specific `enqueue_at` querator
will defer enqueue of that item until the specified time. Retries can also specify a future **retry** time such
that the retried item will not be enqueued to be processed until the specified time is reached.

## Getting Started

TODO: high level examples of using the HTTP/JSON API

```bash
curl http://localhost:2319/queue.produce --json
```

## Installation

TODO

## API Reference
See [OpenAPI Spec](/api)
