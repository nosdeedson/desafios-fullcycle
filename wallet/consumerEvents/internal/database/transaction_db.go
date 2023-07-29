package database

import (
	"database/sql"

	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/entity"
)

type TrasactionDB struct {
	DB *sql.DB
}

func NewTransactionDB(db *sql.DB) *TrasactionDB {
	return &TrasactionDB{
		DB: db,
	}
}

func (t *TrasactionDB) FindById(id string) (*entity.Transaction, error) {
	transaction := &entity.Transaction{}

	stmt, err := t.DB.Prepare("SELECT id, account_from_id, account_to_id, amount, created_at FROM transactions t WHERE t.id= ?")
	if err != nil {
		return nil, err
	}

	defer stmt.Close()
	row := stmt.QueryRow(id)
	err = row.Scan(
		&transaction.ID,
		&transaction.AccountFromId,
		&transaction.AccountToId,
		&transaction.Amount,
		&transaction.CreatedAt,
	)

	if err != nil {
		return nil, err
	}
	return transaction, nil
}
