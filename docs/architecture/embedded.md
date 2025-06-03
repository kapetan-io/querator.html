
# Embedded 

Querator is designed as a library which exposes all API functionality via
`Service` method calls. Users can use the `daemon` package or invoke
`querator.NewService()` directly to get a new instance of `Service` to interact
with.

TODO: Talk about the embedded databases we ship with
TODO: Examples of using Querator as a library

### Embedded Library

Add Querator as a Go module dependency:

```bash
go get github.com/kapetan-io/querator
```

```go
package main

import (
    "github.com/kapetan-io/querator"
)

func main() {
    // Create a new Querator service instance
    service := querator.NewService()
    
    // Configure and start the service
    // ... implementation details
}
```