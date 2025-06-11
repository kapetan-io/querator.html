
# Embedded 

Querator is designed as a library which exposes all API functionality via
`Service` method calls. Users can use the `daemon` package or invoke
`querator.NewService()` directly to get a new instance of `Service` to interact
with.

### Embedded Library

Add Querator as a Go module dependency:

```bash
go get github.com/kapetan-io/querator
```

```go
package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/kapetan-io/querator/daemon"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Create daemon with default config (localhost:2319, in-memory storage)
	d, err := daemon.NewDaemon(ctx, daemon.Config{})
	if err != nil {
		log.Fatalf("Failed to create daemon: %v", err)
	}

	// Setup graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-sigChan
		log.Println("Shutdown signal received, gracefully shutting down...")
		cancel()

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		if err := d.Shutdown(ctx); err != nil {
			log.Printf("Error during shutdown: %v", err)
		}
		os.Exit(0)
	}()

	// Keep the program running until shutdown signal
	<-ctx.Done()	
}
```