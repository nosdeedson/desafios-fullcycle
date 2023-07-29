package gateway

import "github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/walletcore/internal/entity"

type TransactionGateway interface {
	Create(transaction *entity.Transaction) error
}
