package web

import (
	"encoding/json"
	"net/http"

	getstatement "github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/usecase/get_statement"
)

type WebStatementHandler struct {
	GetStatementUseCase getstatement.GetStatementUseCase
}

func NewWebStatementHandler(getStatement getstatement.GetStatementUseCase) *WebStatementHandler {
	return &WebStatementHandler{
		GetStatementUseCase: getStatement,
	}
}

func (h *WebStatementHandler) GetStatement(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	out, err := h.GetStatementUseCase.Execute(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/html")
	err = json.NewEncoder(w).Encode(out)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusAccepted)
}
