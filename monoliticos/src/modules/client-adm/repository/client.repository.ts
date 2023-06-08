import Id from "../../domain/entity/value-object/id.value-object";
import ClientEntity from "../domain/client.entity";
import Client from "../domain/client.entity";
import { ClientGateway } from "../gateway/client.gateway";
import ClientModel from "./client.model";

export default class ClientRepository implements ClientGateway{

    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createAt: client.createAt,
            updateAt: client.updateAt
        })
    }

    async find(id: string): Promise<Client> {
        const result = await ClientModel.findOne({where:{ id: id}});
        const clientBD = result.dataValues
        if(clientBD === null){
            throw new Error('client not found')
        }
        const props = {
            id: new Id(clientBD.id),
            name: clientBD.name,
            email: clientBD.email,
            address: clientBD.address,
            createAt: clientBD.createAt,
            updateAt: clientBD.updateAt,
        }
        return new ClientEntity(props)
    }

}