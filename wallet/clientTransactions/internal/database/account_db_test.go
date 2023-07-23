package database

import (
	"consumer/internal/entity"
	"database/sql"
	"testing"

	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type AccountDBTestSuite struct {
	suite.Suite
	db        *sql.DB
	accountDB *AccountDB
	client    *entity.Client
}

func (a *AccountDBTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	a.Nil(err)
	a.db = db
	db.Exec("Create table clients (id varchar(255), name varchar(255), email varchar(255), created_at date)")
	db.Exec("Create table accounts (id varchar(255), client_id varchar(255), balance int, created_at date)")
	a.accountDB = NewAccountDB(db)
	a.client, _ = entity.NewClient("jose", "j@j")
}

func (a *AccountDBTestSuite) TearDownSuite() {
	defer a.db.Close()
	a.db.Exec("DROP TABLE clients")
	a.db.Exec("DROP TABLE accounts")
}

func TestAccountDBTestSuite(t *testing.T) {
	suite.Run(t, new(AccountDBTestSuite))
}

func (a *AccountDBTestSuite) TestFindByID() {

	accountDB, err := a.accountDB.FindById("008ef379-ebef-4f0c-9f60-6d5260e6aff3")
	a.Nil(err)
	a.NotNil(accountDB)
}
