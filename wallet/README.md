## HOW TO TEST

## Run: docker compose up --build

## the command will create all containers
## but the app container is spending a lot of time to finish the building
## so to be sure that the talbles were created after the containers were created
## conect to app using: docker compose logs -f app
## when the message 'Server is running' appear everything is fine
## so you can use the example request in the client.http file which is in walletcore/api
## is necessary to create a transaction with the data in the request because it uses the
## accounts and clients inserted with the migrations
## the GET requests will retorno a statement, which was created in the cosumer (FROM THE KAFKA)
