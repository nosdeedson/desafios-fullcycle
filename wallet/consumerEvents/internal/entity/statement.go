package entity

import (
	"time"
)

type Statement struct {
	ID         string
	NameCredit string
	NameDebit  string
	Amount     float64
	CreatedAt  time.Time
}

func NewStatement(id string, nameDebit string, nameCredit string, amount float64) (*Statement, error) {
	statement := &Statement{
		ID:         id,
		NameCredit: nameCredit,
		NameDebit:  nameDebit,
		Amount:     amount,
		CreatedAt:  time.Now(),
	}
	return statement, nil
}
