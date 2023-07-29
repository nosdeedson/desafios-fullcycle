package createclient

import (
	"time"

	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/walletcore/internal/entity"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/walletcore/internal/gateway"
)

type CreateClientInputDto struct {
	Name  string
	Email string
}

type CreateClientOutputDto struct {
	ID        string
	Name      string
	Email     string
	CreatedAt time.Time
	UpdateAt  time.Time
}

type CreateClientUseCase struct {
	clientGateway gateway.ClientGateway
}

func NewCreateClientUseCase(clientGateway gateway.ClientGateway) *CreateClientUseCase {
	return &CreateClientUseCase{
		clientGateway: clientGateway,
	}
}

func (uc *CreateClientUseCase) Execute(input CreateClientInputDto) (*CreateClientOutputDto, error) {
	client, err := entity.NewClient(input.Name, input.Email)
	if err != nil {
		return nil, err
	}
	err = uc.clientGateway.Save(client)
	if err != nil {
		return nil, err
	}

	output := &CreateClientOutputDto{
		ID:        client.ID,
		Name:      client.Name,
		Email:     client.Email,
		CreatedAt: client.CreatedAt,
		UpdateAt:  client.UpdatedAt,
	}
	return output, nil
}
