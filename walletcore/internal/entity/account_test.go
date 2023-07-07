package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateAccount(t *testing.T) {
	client, _ := NewClient("jose", "j@j")
	account := NewAccount(client)
	assert.NotNil(t, account)
	assert.Equal(t, client.ID, account.ClientId)
}

func TestDontCreateAccount(t *testing.T) {
	account := NewAccount(nil)
	assert.Nil(t, account)
}

func TestAddCredit(t *testing.T) {
	client, _ := NewClient("jose", "j@j")
	account := NewAccount(client)
	account.Credit(100.0)
	assert.NotNil(t, account)
	assert.Equal(t, account.Balance, 100.0)
}

func TestAddDebit(t *testing.T) {
	client, _ := NewClient("jose", "j@j")
	account := NewAccount(client)
	account.Credit(100.0)
	assert.NotNil(t, account)
	assert.Equal(t, account.Balance, 100.0)

	account.Debit(50.0)
	assert.Equal(t, account.Balance, 50.0)

}
