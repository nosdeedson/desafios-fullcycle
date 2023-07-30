package getstatement

import (
	"fmt"
	"time"

	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/gateway"
)

type GetStatementUseCaseOutPut struct {
	ID         string
	NameCredit string
	NameDebit  string
	Amount     float64
	CreatedAt  time.Time
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
	fmt.Println(id)
	t, err := statement.statementGateway.FindById(id)
	output := &GetStatementUseCaseOutPut{}
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	output.Amount = t.Amount
	output.CreatedAt = t.CreatedAt
	output.ID = t.ID
	output.NameCredit = t.NameCredit
	output.NameDebit = t.NameDebit
	return output, nil
}
