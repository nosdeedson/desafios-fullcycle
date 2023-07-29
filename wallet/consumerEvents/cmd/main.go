package main

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/database"
	getstatement "github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/usecase/get_statement"
	web "github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/webconsumer"
	webserverconsumer "github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/internal/webconsumer/webserverConsumer"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/wallet/consumerEvents/pkg/kafka"
)

func main() {

	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/wallet?charset=utf8&parseTime=True&loc=Local")
	// driver, err := mysql.WithInstance(db, &mysql.Config{})
	// if err != nil {
	// 	panic(err)
	// }
	// m, err := migrate.NewWithDatabaseInstance(
	// 	"file://migrations",
	// 	"mysql",
	// 	driver,
	// )

	// m.Up()

	configMap := ckafka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
		"group.id":          "wallet",
	}
	configMap["auto.offset.reset"] = "earliest"

	Topic := []string{"transactions"}
	statementDB := database.NewStatementDB(db)
	getStatementUseCase := getstatement.NewGetStatementUseCase(statementDB)

	webserver := webserverconsumer.NewWebServer(":8081")
	statementHandler := web.NewWebStatementHandler(*getStatementUseCase)
	webserver.AddHandler("/statements", statementHandler.GetStatement)
	go webserver.Start()
	fmt.Println("server is runnig")

	consumer := kafka.NewConsumerTransactionsKafka(&configMap, Topic)
	_, err = consumer.Consume()
	if err != nil {
		panic(err)
	}

}
