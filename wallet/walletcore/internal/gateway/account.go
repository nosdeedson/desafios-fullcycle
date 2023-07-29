package gateway

import "github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/walletcore/internal/entity"

type AccountGateway interface {
	Save(account *entity.Account) error
	FindById(id string) (*entity.Account, error)
	UpdateBalance(account *entity.Account) error
}
