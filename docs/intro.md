---
sidebar_position: 1
---

# Introduction

Querator is a highly scalable, high performance **Almost Exactly Once
Delivery** (AEOD) Queue system designed to enable developers to build
event-driven, highly resilient, distributed, high-performance applications. The
project is inspired by production systems that scaled SaaS companies like
Mailgun from millions to billions of events per day.

## The Problem We're Solving

While open-source queue services like Pulsar, RabbitMQ and Kafka do exist, many
of them tend to be overly complex and demand significant investment from
platform and infrastructure teams, which may not always be an option in a
typical enterprise-class company. This situation is particularly relevant when
queues are not considered a central aspect of the enterprise software
landscape, making the investment less justifiable. Consequently, local teams
often find themselves developing a diverse range of table-based queue systems
tailored to their specific requirements.

Querator is designed to fill that gap with a simple scalable and production
tested queue implementation; all you need is a database.

As one Stack Overflow user put it:

> It's probably the tenth time I'm implementing something like this, and I've
> never been 100% happy about solutions I came up with. The reason I'm using
> mysql table instead of a "proper" messaging system is attractive is primarily
> because most application already use some relational database for other stuff
> (which tends to be mysql for most of the stuff I've been doing), while very
> few applications use a messaging system. Also - relational databases have
> very strong ACID properties, while messaging systems often don't.

[Stack Overflow - MySQL Queue](https://stackoverflow.com/questions/423111/whats-the-best-way-of-implementing-a-messaging-queue-table-in-mysql)

## Project Goals
- Focus on efficiency first
- Build a re-usable service to encourage good distributed design even for small
  projects so they don't need to re-architect as they scale
- Push complexity on the service, to simplify the client
- Provide a Simple API, so anyone with `curl` can use Querator

## The "Almost" in Almost Exactly Once Delivery

We say **"Almost" Exactly Once** because [Exactly Once Delivery (EOD) is theoretically
impossible](https://bravenewgeek.com/you-cannot-have-exactly-once-delivery/).
However, in practice, you can achieve AEOD—or "Almost Exactly Once
Delivery"—which is functionally equivalent to EOD, with the understanding that
occasional duplicate deliveries may occur due to system failures.

From our experience operating EOD systems at scale, the likelihood of duplicate
delivery and processing is about the same as your system's overall failure
rate. In other words, message delivery is only as reliable as the system it
runs on. Remember, [Distributed systems are all about trade-offs](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/).

Anyone claiming their system provides precise EOD is being disingenuous at best.

## The Lease Pattern: Solving Distributed Coordination

Unlike streaming or other queue systems, Querator is designed from the ground
up to provide high throughput access to items in the queue via a
[Lease](https://en.wikipedia.org/wiki/Lease_(computer_science)). When a
consumer pulls an item off the queue there is an explicit **lease** created
between the consumer and Querator. The consumer gains exclusive right to
process that item, until such time as they mark the item as **complete** or
tell Querator to **retry** the item by releasing the **lease** and giving the
item to another consumer immediately, or at some future date and time.

The concept of a **lease** provides users of Querator with proof the item was
delivered and provides assurances that the item was processed by the consumer!
In this way, you can sort of think of a **lease** as a locking primitive for
processing items. A Consumer can hold on to the lease until the agreed upon
timeout, it can hold off marking the lease as complete until it has processed
the item that it consumed. As a result, you can use the locking primitive the
lease provides to solve several distributed problems:

- Implement multi-step, durable execution functions
- Implement the Saga Pattern for distributed transactions
- Use it as a FIFO queue with ordered delivery of messages
- Use it as a limit locking system, where items in the queue represent a limited lockable resource

### How the Lease Pattern Works

Here are the key steps to achieve reliable processing:

- **Lease**: When a message is consumed from the queue, the consumer marks the
item in the queue as "reserved". If there are many consumers all attempting to
reserve items from the queue, then reservation could be a race and the
reservation must be an atomic operation. The first consumer to win the race and
mark the item as reserved, gains exclusive rights to process the item. More
efficient implementations will queue consumers such that exclusive right
acquisition is on a first come first serve basis in order to ensure even
distribution of queue items.

- **Expiration**: If the reserved message is not processed within a specified
time, the reservation expires, and the message is released back into the queue
to be reserved again.

- **Confirmation**: Once the message is processed successfully, the consumer
confirms the reservation, ensuring that the message will not be processed
again.

- **Deferred**: Some queue implementations allow the consumer to voluntarily
defer or retry the message, by cancelling the reservation and adding the item
back to the queue to be offered to some other consumer. Optionally, the defer
can specify a future date and time when the message will be re queued.

## Core Features

### FIFO Queues with Lease Management
The queue service provides FIFO (First-In, First-Out) queues, allowing
consumers to reserve exclusive right to an item in the queue, then mark the
item as complete or defer the item to be provided to a different consumer.

### Scheduled Delivery
Querator supports scheduled delivery of items queued. Given a specific
`enqueue_at`, Querator will defer enqueue of that item until the specified
time. Retries can also specify a future **retry** time such that the retried
item will not be enqueued to be processed until the specified time is reached.

### Retries and Deferral
In case of a temporary failed item, the service supports retrying through the
"Defer" option, which allows you to add the item back to the top of the queue
or schedule the item to be retried at a later time.

### Dead Letter Queue Support
Dead Letter Queue functionality is included to handle items that repeatedly
fail processing after reaching maximum retry attempts.

## Querator can be used for
- A highly scaleable queue!
- The [Saga Pattern](https://microservices.io/patterns/data/saga.html) for distributed transactions
- A Distributed locking service
- Workflows - anything where at least once, or only once processing is required
- Multi-step, durable execution

## Installation

See our [Getting Started Guide](/docs/getting-started) for detailed installation and setup instructions.

## API Reference

For complete API documentation with all endpoints, request/response schemas, and examples, see our [OpenAPI Specification](/api).

## What's Next?

- **[Architecture Overview](/docs/architecture/intro)** - Learn about Querator's distributed architecture and scaling approach
- **[Getting Started Guide](/docs/getting-started)** - Step-by-step setup and first implementation
