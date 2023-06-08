import ClientFacade from "../facade/client-adm-facade";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory{

    static create(){
        const clientRepository = new ClientRepository();
        const addClient = new AddClientUseCase(clientRepository);
        const findClient = new FindClientUseCase(clientRepository);

        const clientFacade = new ClientFacade({
            addUseCase: addClient,
            findUseCase: findClient
        });
        return clientFacade;
    }

}