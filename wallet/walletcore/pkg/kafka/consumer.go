package kafka

import ckafka "github.com/confluentinc/confluent-kafka-go/kafka"

type ConsumerKafka struct {
	ConfgMap *ckafka.ConfigMap
	Topics   []string
}

func NewConsumerKafka(configMap *ckafka.ConfigMap, topics []string) *ConsumerKafka {
	return &ConsumerKafka{
		ConfgMap: configMap,
		Topics:   topics,
	}
}

func (c *ConsumerKafka) Consume(msgChan chan *ckafka.Message) error {
	consumer, err := ckafka.NewConsumer(c.ConfgMap)
	if err != nil {
		panic(err)
	}

	err = consumer.SubscribeTopics(c.Topics, nil)
	if err != nil {
		panic(err)
	}

	for {
		msg, err := consumer.ReadMessage(-1)
		if err != nil {
			msgChan <- msg
		}
	}
}
