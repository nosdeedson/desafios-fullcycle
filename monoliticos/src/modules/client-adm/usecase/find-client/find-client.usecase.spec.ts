import Id from "../../../domain/entity/value-object/id.value-object"
import ClientEntity from "../../domain/client.entity"
import AddressClientDto from "../../domain/value-object/address"
import FindClientUseCase from "./find-client.usecase"

const client = new ClientEntity({
    id: new Id('1'),
    name: 'client',
    email: 'teste@teste',
    document: 'doc',
    address: new AddressClientDto('street', '1', 'city', 'zipcode', 'state', 'complement')
})

const MockRepository = () =>{
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    }
}

describe("find client use case test unit", () =>{

    it("should find a client",async () => {
        const clientRepository = MockRepository();
        const usecase = new FindClientUseCase(clientRepository);

        const result = await usecase.execute({id: '1'});

        expect(clientRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(client.id.id)
        expect(result.name).toBe(client.name)
        expect(result.email).toBe(client.email)
        expect(result.document).toBe(client.document)
        expect(result.address).toStrictEqual(client.address)
    })
})