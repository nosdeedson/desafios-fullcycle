package kafka

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	_ "github.com/go-sql-driver/mysql"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/database"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/entity"
)

type ConsumerTransactionsKafka struct {
	ConfgMap *ckafka.ConfigMap
	Topics   []string
}

type Payload struct {
	ID            string `json:"id"`
	AccountIdFrom string `json:"account_id_from"`
	AccountIdTo   string `json:"account_id_to"`
	Amount        float64
}

type ResultTransaction struct {
	Name    string
	Payload Payload
}

func NewConsumerTransactionsKafka(configMap *ckafka.ConfigMap, topics []string) *ConsumerTransactionsKafka {
	return &ConsumerTransactionsKafka{
		ConfgMap: configMap,
		Topics:   topics,
	}
}

func (c *ConsumerTransactionsKafka) Consume() (*ResultTransaction, error) {
	consumer, err := ckafka.NewConsumer(c.ConfgMap)
	response := &ResultTransaction{}
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
	fmt.Println("runing")

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/wallet?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err)
	}
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
			var message ResultTransaction
			json.Unmarshal(ev.Value, &message)
			if err != nil {
				fmt.Println(err)
			}
			fmt.Println(message)
			accountDB := database.NewAccountDB(db)
			clientDB := database.NewClientDB(db)
			transactionDB := database.NewTransactionDB(db)

			accountFrom, err := accountDB.FindById(message.Payload.AccountIdFrom)
			accountTo, err := accountDB.FindById(message.Payload.AccountIdTo)
			clientFrom, err := clientDB.FindById(accountFrom.ClientID)
			clientTo, err := clientDB.FindById(accountTo.ClientID)

			transaction, err := transactionDB.FindById(message.Payload.ID)
			fmt.Println(transaction)
			if err != nil {
				panic(err)
			}

			statement, err := entity.NewStatement("1", clientFrom.Name, clientTo.Name, transaction.Amount)
			fmt.Println(statement)
			//statementDB := database.NewStatementDB(db)
			//err = statementDB.Save(statement)
		}
	}
	fmt.Printf("response: %s", response)
	return response, nil
}

func NewStatement(s1, s2, s3 string, f float64) {
	panic("unimplemented")
}
