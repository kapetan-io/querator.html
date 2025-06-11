
# Frequently Asked Questions

## How can I guarantee message order?

Even though Querator is a FIFO queue, order cannot be guaranteed if
multiple consumers pull from the same queue, as consumers may receive ordered
items simultaneously, thus losing order.

Consider a scenario with two consumers accessing a FIFO queue:

- Consumer 1 retrieves an item.
- Consumer 2 retrieves an item.
- Consumer 2 finishes processing their item.
- Consumer 1 finishes processing their item.

In this situation, the system -— which includes the entire setup of client producers, Querator, and
client consumers -— cannot reliably maintain the order of item processing when multiple consumers are
involved. To ensure ordered processing, items which require preservation of order should be placed
in the same queue, and that queue must have only one partition and one consumer.

To guarantee message order, create a queue with a single partition and a single
consumer that leases items from the queue. You can scale this approach by
creating multiple queues, each with a single partition and a single consumer.
An alternative is use a lock service that refuses to process any leased items
if the lock is currently held by another consumer.