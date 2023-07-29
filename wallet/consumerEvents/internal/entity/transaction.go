package entity

import "time"

type Transaction struct {
	ID            string
	AccountFrom   *Account
	AccountFromId string
	AccountTo     *Account
	AccountToId   string
	Amount        float64
	CreatedAt     time.Time
}

func NewTransaction(id string, accountFrom *Account, accountTo *Account, amount float64) (*Transaction, error) {
	transaction := &Transaction{
		ID:          id,
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      amount,
		CreatedAt:   time.Now(),
	}
	return transaction, nil
}
