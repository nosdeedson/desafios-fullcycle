import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import Id from "../../domain/entity/value-object/id.value-object";
import AddressClientDto from "../domain/value-object/address";

describe('client adm facade test unit', () =>{

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ClientModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a client',async () => {
        const clientFacade = ClientAdmFacadeFactory.create();

        const input = {
            id: new Id('1'),
            name: 'client',
            document: 'doc',
            email: 'teste@teste',
            address: new AddressClientDto('street', '1', 'city', 'zipcode', 'state', 'complement')
        }

        await clientFacade.add(input);
        const result = await ClientModel.findOne({where: {id: '1'}});
       
        const client = result.dataValues;
        expect(client).toBeDefined();
        expect(client.id).toEqual('1');
        expect(client.name).toEqual('client');
        expect(client.email).toEqual('teste@teste');
        expect(client.city).toStrictEqual(input.address.city)

    })

    it('should find a client',async () => {
        await ClientModel.create({
            id: '2',
            name: 'client 2',
            email: 'teste@teste',
            document: 'doc',
            street: 'street',
            state: 'state',
            complement: 'complement',
            zipCode: 'zipcode',
            number: '2',
            city: 'city',
            createAt: new Date(),
            updateAt: new Date(),
        });

        const clientFacade = ClientAdmFacadeFactory.create();
        const result = await clientFacade.find({id: '2'});
        expect(result).toBeDefined();
        expect(result.id).toBe('2')
        expect(result.name).toBe('client 2')
        expect(result.email).toBe('teste@teste')
        expect(result.address.city).toBe('city')
    })
})