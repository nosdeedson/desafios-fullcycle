# FROM scratch

# WORKDIR /app

# COPY hello-world .

# CMD [ "./hello-world" ]

FROM golang:alpine3.10

WORKDIR /usr/app

COPY go.mod .
COPY go.sum .
COPY hello-world.go .

# Download all the dependencies
RUN go get -d -v ./...

# Install the package
RUN go install -v ./...

RUN go build hello-world.go

CMD ["./hello-world"]