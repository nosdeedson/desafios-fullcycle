package main

import (
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/consumerWallet/clientTransactions/pkg/kafka"
)

func main() {

	configMap := ckafka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
		"group.id":          "wallet",
	}
	configMap["auto.offset.reset"] = "earliest"

	Topic := []string{"transactions"}

	consumer := kafka.NewConsumerTransactionsKafka(&configMap, Topic)
	consumer.Consume()

}
