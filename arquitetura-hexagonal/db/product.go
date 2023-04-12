package db

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/arquitetura-hexagonal/application"
)

type ProductDb struct {
	db *sql.DB
}

func NewProductDb(db *sql.DB) *ProductDb {
	return &ProductDb{db: db}
}

func (p *ProductDb) Get(id string) (application.ProdudctInterface, error) {
	var product application.Product
	stmt, err := p.db.Prepare("select if, name, price, status from products where id=?")
	if err != nil {
		return nil, err
	}

	err = stmt.QueryRow(id).Scan(&product.ID, &product.Name, &product.Price, &product.Status)
	if err != nil {
		return nil, err
	}
	return &product, nil

}
