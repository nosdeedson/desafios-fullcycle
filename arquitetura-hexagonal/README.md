## create container with the command: docker-compose up --build -d

## enter in the container
## use the command: go mod init github.com/nosdeedson/desafios-fullcycle/tree/main/arquitetura-hexagonal

## command go to download dependencies: go get .
## the command above dowload the dependencies needed in the package

## command to run the tests: go test ./...
## run all the tests (files)
## command got test file.go run the tests in the file

## creating mocks
## type inside the container appproduct: mockgen -destination=application/mocks/application.go -source=application/product.go application