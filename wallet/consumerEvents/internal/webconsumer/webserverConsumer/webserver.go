package webserverconsumer

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type WebServerForConsumer struct {
	Router        chi.Router
	Handlers      map[string]http.HandlerFunc
	WebServerPort string
}

func NewWebServer(webServerPort string) *WebServerForConsumer {
	return &WebServerForConsumer{
		Router:        chi.NewRouter(),
		Handlers:      make(map[string]http.HandlerFunc),
		WebServerPort: webServerPort,
	}
}

func (w *WebServerForConsumer) AddHandler(path string, handler http.HandlerFunc) {
	w.Handlers[path] = handler
}

func (w *WebServerForConsumer) Start() {
	w.Router.Use(middleware.Logger)
	for path, handler := range w.Handlers {
		w.Router.Get(path, handler)
	}
	http.ListenAndServe(w.WebServerPort, w.Router)
}
