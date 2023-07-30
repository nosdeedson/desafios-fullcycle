package web

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

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

	partsUrl := strings.Split(r.URL.Path, "/")
	id := partsUrl[len(partsUrl)-1]
	output, err := h.GetStatementUseCase.Execute(id)
	fmt.Println(output)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	err = json.NewEncoder(w).Encode(output)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusAccepted)
}
