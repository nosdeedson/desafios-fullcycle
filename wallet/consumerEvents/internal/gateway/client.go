package gateway

import "github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/entity"

type ClientGateway interface {
	FindById(id string) *entity.Client
}
