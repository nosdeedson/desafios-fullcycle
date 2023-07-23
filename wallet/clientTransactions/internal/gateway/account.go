package gateway

import (
	"consumer/internal/entity"
)

type AccountGateway interface {
	FindById(id string) (*entity.Account, error)
}
