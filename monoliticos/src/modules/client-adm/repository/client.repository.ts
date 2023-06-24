import { number } from "yup";
import Id from "../../domain/entity/value-object/id.value-object";
import ClientEntity from "../domain/client.entity";
import Client from "../domain/client.entity";
import { ClientGateway } from "../gateway/client.gateway";
import ClientModel from "./client.model";
import AddressClientDto from "../domain/value-object/address";

export default class ClientRepository implements ClientGateway{

    async add(client: Client): Promise<void> {
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.address.street,
            city: client.address.city,
            state: client.address.state,
            number: client.address.number,
            zipCode: client.address.zipCode,
            complement: client.address.complement,
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
            document: clientBD.document,
            address: new AddressClientDto(clientBD.street, clientBD.number, clientBD.city,
                clientBD.zipCode, clientBD.sequelize, clientBD.complement),
            createAt: clientBD.createAt,
            updateAt: clientBD.updateAt,
        }
        return new ClientEntity(props)
    }

}