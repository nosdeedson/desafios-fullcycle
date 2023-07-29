FROM golang:1.20

WORKDIR /app

RUN apt-get update && apt-get install -y librdkafka-dev

COPY . .

WORKDIR /app/cmd/walletcore

#CMD [ "tail", "-f", "/dev/null" ]

CMD [ "go", "run",  "main.go" ]