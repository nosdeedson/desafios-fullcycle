package main

import (
	"context"
	"database/sql"
	"fmt"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"

	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/mysql"
	_ "github.com/golang-migrate/migrate/v4/source/file"

	"github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/internal/database"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/internal/event"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/internal/event/handler"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/internal/usecase/create_account"
	createclient "github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/internal/usecase/create_client"
	createtransaction "github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/internal/usecase/create_transaction"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/internal/web"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/internal/web/webserver"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/pkg/events"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/pkg/kafka"
	"github.com/nosdeedson/desafios-fullcycle/tree/main/walletcore/pkg/uow"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/wallet?charset=utf8&parseTime=True&loc=Local")
	fmt.Println(err)
	if err != nil {
		panic(err)
	}

	driver, err := mysql.WithInstance(db, &mysql.Config{})
	if err != nil {
		panic(err)
	}
	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		"mysql",
		driver,
	)
	fmt.Println(err)

	m.Up()

	defer db.Close()

	configMap := ckafka.ConfigMap{
		"bootstrap.servers": "kafka:29092",
		"group.id":          "wallet",
	}
	kafkaProducer := kafka.NewProducerKafka(&configMap)

	eventDispatcher := events.NewEventDispatcher()
	eventDispatcher.Register("TransactionCreated", handler.NewTransactionCreatedKafkaHandler(kafkaProducer))
	eventDispatcher.Register("BalanceUpdated", handler.NewUpdatedBalanceKafkaHandler(kafkaProducer))
	transactionCreatedEvent := event.NewTransactionCreated()
	balanceUpdatedEvent := event.NewBalanceUpdated()

	clientDb := database.NewClientDB(db)
	accountDb := database.NewAccountDB(db)

	ctx := context.Background()
	uow := uow.NewUow(ctx, db)

	uow.Register("AccountDB", func(tx *sql.Tx) interface{} {
		return database.NewAccountDB(db)
	})

	uow.Register("TransactionDB", func(tx *sql.Tx) interface{} {
		return database.NewTransactionDB(db)
	})
	createTransactionUseCase := createtransaction.NewCreateTransactionUseCase(uow, eventDispatcher, transactionCreatedEvent, balanceUpdatedEvent)
	createClientUseCase := createclient.NewCreateClientUseCase(clientDb)
	createAccountUseCase := create_account.NewCreateAccountUseCase(accountDb, clientDb)

	webserver := webserver.NewWebServer(":8080")

	clientHandler := web.NewWebClientHandler(*createClientUseCase)
	accountHandler := web.NewWebAccountHandler(*createAccountUseCase)
	transactionHandler := web.NewWebTransactionHandler(*createTransactionUseCase)

	webserver.AddHandler("/clients", clientHandler.CreateClient)
	webserver.AddHandler("/accounts", accountHandler.CreateAccount)
	webserver.AddHandler("/transactions", transactionHandler.CreateTransaction)

	fmt.Println("Server is running")
	webserver.Start()
}
