package gateway

import "github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/entity"

type StatementGateway interface {
	FindById(id string) (*entity.Statement, error)
	Save(statement *entity.Statement) error
}
