package gateway

import "github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/entity"

type AccountGateway interface {
	FindById(id string) (*entity.Account, error)
}
