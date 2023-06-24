import Client from "../../domain/client.entity";
import { ClientGateway } from "../../gateway/client.gateway";
import { FindClientUsecaseInputDto, FindClientUsecaseOutputDto } from "./find-client.usecase.dto";

export default class FindClientUseCase{

    private _clientReporitory: ClientGateway;

    constructor(clientRepository: ClientGateway){
        this._clientReporitory = clientRepository;
    }

    async execute(input: FindClientUsecaseInputDto): Promise<FindClientUsecaseOutputDto>{
        const result = await this._clientReporitory.find(input.id);
        return{
            id: result.id.id,
            name: result.name,
            email: result.email,
            address: result.address,
            document: result.document,
            createAt: result.createAt,
            updateAt: result.updateAt
        }
    }
}