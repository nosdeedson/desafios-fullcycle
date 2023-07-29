package entity

import (
	"time"

	"github.com/google/uuid"
)

type Account struct {
	ID        string
	Client    *Client
	ClientID  string
	Balance   float64
	CreatedAt time.Time
	UpdatedAt time.Time
}

func NewAccount(client *Client) *Account {
	account := &Account{
		ID:        uuid.New().String(),
		Client:    client,
		ClientID:  client.ID,
		Balance:   0,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	return account
}
