package event

import (
	"time"
)

type BalanceUpdated struct {
	Name    string
	Payload interface{}
}

func NewBalanceUpdated() *BalanceUpdated {
	return &BalanceUpdated{
		Name: "BalanceUpdated",
	}
}

func (event *BalanceUpdated) GetName() string {
	return event.Name
}

func (event *BalanceUpdated) GetPayload() interface{} {
	return event.Payload
}

func (event *BalanceUpdated) SetPayload(payload interface{}) {
	event.Payload = payload
}

func (event *BalanceUpdated) GetDateTime() time.Time {
	return time.Now()
}
