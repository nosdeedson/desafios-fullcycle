package database

import (
	"database/sql"
	"testing"

	_ "github.com/go-sql-driver/mysql"

	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/entity"
	"github.com/stretchr/testify/suite"
)

type StatementDBTestSuite struct {
	suite.Suite
	db          *sql.DB
	statementDB *StatementDB
	accountDB   *AccountDB
	transaction *TrasactionDB
}

func (s *StatementDBTestSuite) SetupSuite() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/wallet?charset=utf8&parseTime=True&loc=Local")
	s.Nil(err)
	s.db = db
	s.accountDB = NewAccountDB(db)
	s.transaction = NewTransactionDB(db)
	s.statementDB = NewStatementDB(db)
}

func (s *StatementDBTestSuite) TearDownSuite() {
	defer s.db.Close()
}

func TestStatementDBTestSuite(t *testing.T) {
	suite.Run(t, new(StatementDBTestSuite))
}

func (s *StatementDBTestSuite) TestSave() {
	transactionDB, err := s.transaction.FindById("3397ee8e-78a8-4d5b-b1cb-0c5dcc1cba71")
	s.Nil(err)
	accountFrom, err := s.accountDB.FindById(transactionDB.AccountFromId)
	s.Nil(err)
	accountTo, err := s.accountDB.FindById(transactionDB.AccountToId)
	s.Nil(err)

	statement, err := entity.NewStatement("1", accountFrom.Client.Name, accountTo.Client.Name, transactionDB.Amount)
	s.Nil(err)
	err = s.statementDB.Save(statement)
	s.Nil(err)

}
