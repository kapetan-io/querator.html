---
sidebar_position: 3
---

# Configuration

Querator is configured via a configuration file.

## Configuration File

```yaml
logging:
  # The logging handler; options are 'color', 'text', 'json'
  handler: text
  # The logging level; options are 'info', 'warn', 'error', 'debug',
  level: info

# Queue Storage defines where metadata about the queues is stored
queue-storage:
  driver: badger
  config:
    storage-dir: /tmp/badger-queue.db

# Partition Storage defines where partitions are stored
partition-storage:
  - name: badger-01
    driver: badger
    config:
      storage-dir: /tmp/badger-01.db
```

### In-Memory

```yaml
logging:
  handler: text
  level: info
  
queue-storage:
  driver: memory

partition-storage:
  - name: memory-01
    driver: memory
```

TODO: Add postgreSQL, Mysql, MongoDB configs when support is added