
# FAQ: Frequently Asked Questions
TODO: Turn this into an actual FAQ

### Use Cases Where Order Matters

Order is not always required, but is often expected from such systems. Even if
the underlying queue implementation is a FIFO, order cannot be guaranteed if
multiple consumers pull from the same queue, as consumers may receive ordered
items simultaneously, thus losing order.

An example is a FIFO queue which contains a list of async jobs which must be
completed in order. For instance: There is a "send list" job followed by a
"delete list" job. In such a scenario you expect the "send list" job to run and
complete first, then the "delete list" job deletes the list that was just sent.
Allowing these items to run out of order would be disastrous.

For order to be guaranteed, you either need some keyed synchronization system
which only allows a consumer to work one job per key, or only allow one
consumer for that queue.

