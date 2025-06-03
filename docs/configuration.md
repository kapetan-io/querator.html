---
sidebar_position: 3
---

# Configuration

Querator is configured via a configuration file.

## Configuration File

```yaml
# config.yaml - Production configuration example
server:
  listen: "0.0.0.0:2319"
  read_timeout: "30s"
  write_timeout: "30s"
  idle_timeout: "120s"
  max_header_bytes: 1048576

storage:
  backend: "postgresql"
  connection_string: "postgres://querator:password@localhost/querator?sslmode=require"
  max_connections: 25
  max_idle_connections: 5
  connection_lifetime: "5m"
  
  # Storage-specific settings
  postgresql:
    migration_timeout: "30s"
    lock_timeout: "10s"
    statement_timeout: "30s"
  
  badger:
    path: "/var/lib/querator/data"
    sync_writes: true
    value_log_file_size: "1GB"

logging:
  level: "info"
  format: "json"
  output: "/var/log/querator/querator.log"
  
  # Component-specific log levels
  components:
    storage: "debug"
    cluster: "warn"
    api: "info"

metrics:
  enabled: true
  listen: "0.0.0.0:9090"
  path: "/metrics"
  
  # Prometheus labels
  labels:
    environment: "production"
    datacenter: "us-west-2"

queues:
  # Default queue settings
  defaults:
    lease_timeout: "300s"
    dead_timeout: "24h"
    max_attempts: 5
    requested_partitions: 4
```

### In-Memory

```yaml
storage:
  backend: "memory"
  
  # No additional configuration required
  # All data lost on restart
```
