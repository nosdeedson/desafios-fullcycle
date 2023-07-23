package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {

	configMap := ckafka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
		"group.id":          "wallet",
	}

	configMap["auto.offset.reset"] = "earliest"

	c, err := ckafka.NewConsumer(&configMap)

	if err != nil {
		fmt.Printf("Failed to create consumer: %s", err)
		os.Exit(1)
	}

	topic := "transactions"
	err = c.SubscribeTopics([]string{topic}, nil)

	if err != nil {
		fmt.Printf("Failed to subscrebe topic: %s", err)
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
			ev, err := c.ReadMessage(10 * time.Millisecond)
			if err != nil {
				continue
			}
			// fmt.Printf("Consumed event from topic %s: key = %-10s value = %s\n",
			// *ev.TopicPartition.Topic, string(ev.Key), string(ev.Value))
			fmt.Printf("Consumed event form topic %s: value = %s\n",
				*ev.TopicPartition.Topic, string(ev.Value))
		}
	}

}
