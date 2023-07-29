package getstatement

import (
	"fmt"
	"strings"

	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/gateway"
)

type GetStatementUseCaseOutPut struct {
	statement string
}

type GetStatementUseCase struct {
	statementGateway gateway.StatementGateway
}

func NewGetStatementUseCase(statementGateway gateway.StatementGateway) *GetStatementUseCase {
	return &GetStatementUseCase{
		statementGateway: statementGateway,
	}
}

func (statement *GetStatementUseCase) Execute(id string) (*GetStatementUseCaseOutPut, error) {
	t, err := statement.statementGateway.FindById(id)
	if err != nil {
		return nil, err
	}
	asString := fmt.Sprintf("%v", t.Amount)
	value := []string{"O cliente", t.NameCredit, "enviou", asString, "para", t.NameDebit}
	text := strings.Join(value, " ")
	output := &GetStatementUseCaseOutPut{
		statement: text,
	}
	return output, nil
}
