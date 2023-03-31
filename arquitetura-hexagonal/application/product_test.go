package application_test

import (
	"testing"

	"github.com/codeedu/go-hexagonal/application"
	"github.com/stretchr/testify/require"
)

func TestProduct_Enable(t *testing.T) {
	product := application.Product{}
	product.Name = "hello"
	product.Status = application.DISABLED
	product.Price = 10

	err := product.Enable()
	require.Nill(t, err)
}
