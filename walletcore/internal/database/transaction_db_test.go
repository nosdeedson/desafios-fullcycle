package database

import (
	"database/sql"
	"testing"

	"github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/internal/entity"
	"github.com/stretchr/testify/suite"
)

type TransactionDBTestSuite struct {
	suite.Suite
	db            *sql.DB
	transactionDB *TransactionDB
	accountFrom   *entity.Account
	clientFrom    *entity.Client
	accountTo     *entity.Account
	clientTo      *entity.Client
}

func (t *TransactionDBTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	t.Nil(err)
	t.db = db
	db.Exec("CREATE TABLE clients (id varchar(255), name varchar(255), email varchar(255), created_at date, updated_at date)")
	db.Exec("Create table accounts (id varchar(255), client_id varchar(255), balance float, created_at date)")
	db.Exec("Create table transaction (id varchar(255), account_from_id varchar(255), account_to_id varchar(255), amount float, created_at date)")
	client1, err := entity.NewClient("maria", "m@m")
	t.Nil(err)
	t.clientFrom = client1

	client2, err := entity.NewClient("jose", "j@j")
	t.Nil(err)
	t.clientTo = client2

	account1 := entity.NewAccount(t.clientFrom)
	t.NotNil(account1)
	account1.Balance = 1000
	t.accountFrom = account1

	account2 := entity.NewAccount(t.clientTo)
	t.NotNil(account2)
	account2.Balance = 1000
	t.accountTo = account2

	t.transactionDB = NewTransactionDB(db)
}

func (t *TransactionDBTestSuite) TearDownSuite() {
	defer t.db.Close()
	t.db.Exec("DROP TABLE clients")
	t.db.Exec("DROP TABLE accounts")
	t.db.Exec("DROP TABLE transactions")
}

func TestTransactionDBTestSuite(t *testing.T) {
	suite.Run(t, new(TransactionDBTestSuite))
}
