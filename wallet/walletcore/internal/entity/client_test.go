package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreatNewClient(t *testing.T) {

	client, err := NewClient("jose", "j@j")

	assert.Nil(t, err)
	assert.NotNil(t, client)
	assert.Equal(t, "jose", client.Name)
	assert.Equal(t, "j@j", client.Email)
}

func TestCreatNewClientArgsInvalid(t *testing.T) {
	client, err := NewClient("", "")
	assert.NotNil(t, err)
	assert.Nil(t, client)
}

func TestFailUpdateClient(t *testing.T) {
	client, _ := NewClient("jose", "j@j")
	err := client.Update("jose", "")
	assert.Error(t, err, "email is required")
}
