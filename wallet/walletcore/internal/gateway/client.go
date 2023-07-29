package gateway

import "github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/walletcore/internal/entity"

type ClientGateway interface {
	FindById(id string) (*entity.Client, error)
	Save(client *entity.Client) error
}
