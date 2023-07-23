package database

import (
	"consumer/internal/entity"
	"database/sql"
	"testing"

	"github.com/stretchr/testify/suite"
)

type ClientDBTestSuite struct {
	suite.Suite
	db       *sql.DB
	clientDB *ClientDB
}

func (c *ClientDBTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	c.Nil(err)
	c.db = db
	db.Exec("CREATE TABLE clients (id varchar(255), name varchar(255), email varchar(255), created_at date)")
	c.clientDB = NewClientDB(db)
}

func (c *ClientDBTestSuite) TearDownSuite() {
	defer c.db.Close()
	c.db.Exec(("DROP TABLE clients"))
}

func TestClientDBTestSuite(t *testing.T) {
	suite.Run(t, new(ClientDBTestSuite))
}

func (c *ClientDBTestSuite) TestFindByID() {
	client, _ := entity.NewClient("jose", "j@j")

	clientDB, err := c.clientDB.FindById(client.ID)
	c.Nil(err)
	c.NotNil(clientDB)
	c.Equal(client.ID, clientDB.ID)
	c.Equal(client.Name, clientDB.Name)
	c.Equal(client.Email, clientDB.Email)
}
