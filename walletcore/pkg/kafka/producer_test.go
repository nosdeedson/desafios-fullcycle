package kafka

import (
	"testing"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/stretchr/testify/assert"
)

func TestProducerPublish(t *testing.T) {
	type TrasansctionDtoOutPut struct {
		ID           string `json:"id"`
		Status       string `json:"status"`
		ErrorMessage string `json:"error_messge"`
	}

	expectOutput := TrasansctionDtoOutPut{
		ID:           "1",
		Status:       "rejected",
		ErrorMessage: "you dont have limit for this transaction",
	}

	configMap := ckafka.ConfigMap{
		"test.mock.num.brokers": 3,
	}

	producer := NewProducerKafka(&configMap)
	err := producer.Publish(expectOutput, []byte("1"), "test")
	assert.Nil(t, err)
}
