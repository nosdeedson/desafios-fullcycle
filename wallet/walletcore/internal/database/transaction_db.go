package database

import (
	"database/sql"

	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/walletcore/internal/entity"
)

type TransactionDB struct {
	DB *sql.DB
}

func NewTransactionDB(db *sql.DB) *TransactionDB {
	return &TransactionDB{
		DB: db,
	}
}

func (t *TransactionDB) FindByID(id string) (*entity.Transaction, error) {
	transaction := &entity.Transaction{}
	stmt, err := t.DB.Prepare("SELECT id, account_from_id, account_to_id, amount, created_at FROM transaction t WHERE t.id= ?")

	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	row := stmt.QueryRow(id)

	err = row.Scan(
		&transaction.ID,
		&transaction.AccountFromId,
		&transaction.AccountToId,
		&transaction.CreatedAt,
	)

	if err != nil {
		return nil, err
	}
	return transaction, nil
}

func (t *TransactionDB) Create(transaction *entity.Transaction) error {
	smtp, err := t.DB.Prepare("INSERT INTO transactions (id, account_from_id, account_to_id, amount, created_at) VALUES(?,?,?,?,?)")
	if err != nil {
		return err
	}
	defer smtp.Close()

	_, err = smtp.Exec(transaction.ID, transaction.AccountFrom.ID, transaction.AccountTo.ID, transaction.Amount, transaction.CreatedAt)
	if err != nil {
		return err
	}
	return nil
}
