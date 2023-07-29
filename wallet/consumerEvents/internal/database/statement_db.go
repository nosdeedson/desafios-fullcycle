package database

import (
	"database/sql"

	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/entity"
)

type StatementDB struct {
	DB *sql.DB
}

func NewStatementDB(db *sql.DB) *StatementDB {
	return nil
}

func (s *StatementDB) FindById(id string) (*entity.Statement, error) {
	statement := &entity.Statement{}
	stmt, err := s.DB.Prepare("select id, name_credit, name_debit, amount from statements where id= ?")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	row := stmt.QueryRow(id)
	err = row.Scan(
		&statement.ID,
		&statement.NameCredit,
		&statement.NameDebit,
		&statement.Amount,
	)
	if err != nil {
		return nil, err
	}
	return statement, nil
}

func (s *StatementDB) Save(obj *entity.Statement) error {
	stmt, err := s.DB.Prepare("INSERT INTO statements (id, name_credit, name_debit, amount, created_at) VALUES(?,?,?,?,?)")
	if err != nil {
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(obj.ID, obj.NameCredit, obj.NameDebit, obj.Amount, obj.CreatedAt)
	if err != nil {
		return err
	}
	return nil
}
