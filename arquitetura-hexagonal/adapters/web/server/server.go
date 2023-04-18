package web

import (
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/arquitetura-hexagonal/adapters/web/handler"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/arquitetura-hexagonal/application"
)

type Webserver struct {
	Service application.ProductPersistenceInterface
}

func MakeNewWebServer() *Webserver {
	return &Webserver{}
}

func (w Webserver) Serve() {
	r := mux.NewRouter()
	n := negroni.New(
		negroni.NewLogger(),
	)

	handler.MakeProductHandlers(r, n, w.Serve)

}
