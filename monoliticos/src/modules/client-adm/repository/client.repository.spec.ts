import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client.model";
import Id from "../../domain/entity/value-object/id.value-object";
import ClientRepository from "./client.repository";
import ClientEntity from "../domain/client.entity";

describe('client repository test unit', () =>{

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync:{force: true}
        });
        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        sequelize.close();
    });
    
    it('should create a client',async () => {
        const props = {
            id: new Id('1'),
            name: 'client',
            email: 'email@email',
            address: 'address',
            createAt: new Date(),
            updateAt: new Date(),
        }

        const clientRepository = new ClientRepository();

        await clientRepository.add(new ClientEntity(props))
        const client = await ClientModel.findOne({where: {id: '1'}});

        expect(client.id).toEqual(props.id.id);        
        expect(client.name).toEqual(props.name);        
        expect(client.email).toEqual(props.email);        
        expect(client.address).toEqual(props.address);        
    });

    it('should find a client',async () => {
        
        await ClientModel.create({
            id: '2',
            name: 'client',
            email: 'email@email',
            address: 'address',
            createAt: new Date(),
            updateAt: new Date(),
        });

        const clientRepository = new ClientRepository();
        const result = await clientRepository.find('2');
        expect(result.id.id).toEqual('2');        
        expect(result.name).toEqual('client');        
        expect(result.email).toEqual('email@email');        
        expect(result.address).toEqual('address');        
    });
})