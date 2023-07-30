FROM golang:1.20

WORKDIR /app

RUN apt-get update && apt-get install -y librdkafka-dev

RUN apt-get install git  
RUN apt-get update

COPY . .

RUN go get github.com/go-sql-driver/mysql
RUN go get github.com/confluentinc/confluent-kafka-go
RUN go get github.com/golang-migrate/migrate/v4
RUN go get github.com/hashicorp/go-multierror
RUN go get go.uber.org/atomic
RUN go get github.com/go-chi/chi
RUN go get github.com/go-chi/chi/v5
RUN go get github.com/hashicorp/errwrap
RUN go get github.com/google/uuid

WORKDIR /app/cmd/walletcore

#CMD [ "tail", "-f", "/dev/null" ]

CMD [ "go", "run",  "main.go" ]