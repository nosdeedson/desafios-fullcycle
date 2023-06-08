import Id from "../../../domain/entity/value-object/id.value-object";
import ClientEntity from "../../domain/client.entity";
import { ClientGateway } from "../../gateway/client.gateway";
import { AddClientUsecaseInputDto, AddClientUsecaseOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase{

    private _clientRepository: ClientGateway;
    
    constructor(clientRepository: ClientGateway){
        this._clientRepository = clientRepository;
    }

    async execute(input: AddClientUsecaseInputDto): Promise<AddClientUsecaseOutputDto>{
        const props ={
            id: new Id(input.id.id),
            name: input.name,
            email: input.email,
            address: input.address,
        }

        const client = new ClientEntity(props);
        this._clientRepository.add(client);
        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createAt: client.createAt,
            updateAt: client.updateAt
        }
    }

}