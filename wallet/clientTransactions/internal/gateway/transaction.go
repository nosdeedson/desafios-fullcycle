package gateway

import "consumer/internal/entity"

type TransactionGateway interface {
	FindById(id string) (*entity.Transaction, error)
}
