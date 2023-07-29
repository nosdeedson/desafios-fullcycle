package kafka

import (
	"encoding/json"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

type ConsumerTransactionsKafka struct {
	ConfgMap *ckafka.ConfigMap
	Topics   []string
}

type ResultTransaction struct {
	Payload interface{}
}

func NewConsumerTransactionsKafka(configMap *ckafka.ConfigMap, topics []string) *ConsumerTransactionsKafka {
	return &ConsumerTransactionsKafka{
		ConfgMap: configMap,
		Topics:   topics,
	}
}

func (c *ConsumerTransactionsKafka) Consume() error {
	consumer, err := ckafka.NewConsumer(c.ConfgMap)

	if err != nil {
		fmt.Printf("Failed to create consumer: %s", err)
		os.Exit(1)
	}

	topic := c.Topics[0]
	err = consumer.SubscribeTopics([]string{topic}, nil)

	if err != nil {
		fmt.Printf("Failed to suscribe topic: %s", err)
		os.Exit(1)
	}
	sigchan := make(chan os.Signal, 1)
	signal.Notify(sigchan, syscall.SIGINT, syscall.SIGTERM)

	run := true

	for run {
		select {
		case sig := <-sigchan:
			fmt.Printf("Caught signal %v: terminating\n", sig)
			run = false
		default:
			ev, err := consumer.ReadMessage(10 * time.Millisecond)
			if err != nil {
				continue
			}

			// fmt.Printf("Consumed event from topic %s: value =  %s\n", topic,
			// 	string(ev.Value))
			// fmt.Printf( ev.Value)
			json, err := json.Marshal(ev.Value)
			if err != nil {
				fmt.Println(err)
			}
			fmt.Println(json)
		}
	}
	return nil
}
