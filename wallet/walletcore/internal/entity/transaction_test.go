package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateTransaction(t *testing.T) {
	client1, _ := NewClient("jose", "j@j")
	client2, _ := NewClient("lucineia", "l@l")
	account1 := NewAccount(client1)
	account2 := NewAccount(client2)

	account1.Credit(1000.0)
	account2.Credit(1000.0)

	transaction, err := NewTransaction(account1, account2, 100.0)
	assert.Nil(t, err)
	assert.NotNil(t, transaction)
	assert.Equal(t, account1.Balance, 900.0)
	assert.Equal(t, account2.Balance, 1100.0)
}
