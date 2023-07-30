FROM golang:1.20

WORKDIR /app

RUN apt-get update && apt-get install -y librdkafka-dev

COPY . .

RUN apt-get install git  
RUN apt-get update

RUN go get github.com/confluentinc/confluent-kafka-go
RUN go get github.com/go-sql-driver/mysql
#RUN go get github.com/golang-migrate/migrate/v4 
RUN go get github.com/go-chi/chi/v5 
RUN go get github.com/google/uuid

WORKDIR /app/cmd

#CMD [ "tail", "-f", "/dev/null" ]

CMD [ "go", "run",  "main.go" ]