
# Frequently Asked Questions

## When does message order matter?

Order is not always required, but is often expected from queue systems. Even if
the underlying queue implementation is a FIFO, order cannot be guaranteed if
multiple consumers pull from the same queue, as consumers may receive ordered
items simultaneously, thus losing order.

## Can you give an example where order is critical?

Consider a FIFO queue containing async jobs that must be completed in order.
For instance: There is a "send list" job followed by a "delete list" job. In
this scenario you expect the "send list" job to run and complete first, then
the "delete list" job deletes the list that was just sent. Allowing these items
to run out of order would be disastrous.

## How can I guarantee message order?

For order to be guaranteed, you either need:
- A keyed synchronization system which only allows a consumer to work one job per key
- Only allow one consumer for that queue

