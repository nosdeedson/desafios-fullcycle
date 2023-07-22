package gateway

import "github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/internal/entity"

type TransactionGateway interface {
	Create(transaction *entity.Transaction) error
}
