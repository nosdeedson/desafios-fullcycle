FROM golang:1.20

WORKDIR /app

RUN apt-get update && apt-get install -y librdkafka-dev

WORKDIR /app/cmd/walletcore

CMD [ "go", "run",  "main.go" ]