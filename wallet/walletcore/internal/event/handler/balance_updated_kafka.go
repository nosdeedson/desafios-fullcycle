package handler

import (
	"fmt"
	"sync"

	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/walletcore/pkg/events"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/walletcore/pkg/kafka"
)

type UpdatedBalanceKafkaHandler struct {
	Kafka *kafka.Producer
}

func NewUpdatedBalanceKafkaHandler(kafka *kafka.Producer) *UpdatedBalanceKafkaHandler {
	return &UpdatedBalanceKafkaHandler{
		Kafka: kafka,
	}
}

func (h *UpdatedBalanceKafkaHandler) Handle(message events.EventInterface, wg *sync.WaitGroup) {
	defer wg.Done()
	h.Kafka.Publish(message, nil, "balances")
	fmt.Println(" UpdatedBalanceKafkaHandler called")
}
