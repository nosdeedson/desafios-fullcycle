package handler

import (
	"fmt"
	"sync"

	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/walletcore/pkg/events"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/walletcore/pkg/kafka"
)

type TransactionCreatedKafkaHandler struct {
	Kafka *kafka.Producer
}

func NewTransactionCreatedKafkaHandler(kafka *kafka.Producer) *TransactionCreatedKafkaHandler {
	return &TransactionCreatedKafkaHandler{
		Kafka: kafka,
	}
}

func (handler *TransactionCreatedKafkaHandler) Handle(message events.EventInterface, wg *sync.WaitGroup) {
	defer wg.Done()
	handler.Kafka.Publish(message, nil, "transactions")
	fmt.Printf(" TransactionCreatedKafkaHandler called")
}
