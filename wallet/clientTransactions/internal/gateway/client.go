package gateway

import "consumer/internal/entity"

type ClientGateway interface {
	FindById(id string) (*entity.Client, error)
}
