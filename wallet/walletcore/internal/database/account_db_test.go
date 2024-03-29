package database

import (
	"database/sql"
	"testing"

	_ "github.com/mattn/go-sqlite3"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/walletcore/internal/entity"
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

func (a *AccountDBTestSuite) TestSave() {
	account := entity.NewAccount(a.client)
	err := a.accountDB.Save(account)
	a.Nil(err)
}

func (a *AccountDBTestSuite) TestFindByID() {
	a.db.Exec("Insert into clients (id, name, email, created_at) values (?, ?, ?, ?)",
		a.client.ID, a.client.Name, a.client.Email, a.client.CreatedAt,
	)
	account := entity.NewAccount(a.client)
	err := a.accountDB.Save(account)
	a.Nil(err)
	accountDB, err := a.accountDB.FindById(account.ID)
	a.Nil(err)
	a.NotNil(accountDB)
	a.Equal(account.ID, accountDB.ID)
	a.Equal(account.ClientID, accountDB.ClientID)
	a.Equal(account.Balance, accountDB.Balance)
	a.Equal(account.Client.ID, accountDB.Client.ID)
	a.Equal(account.Client.Name, accountDB.Client.Name)
	a.Equal(account.Client.Email, accountDB.Client.Email)
}
