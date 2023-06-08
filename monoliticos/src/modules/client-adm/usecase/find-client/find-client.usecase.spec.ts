import Id from "../../../domain/entity/value-object/id.value-object"
import ClientEntity from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"

const client = new ClientEntity({
    id: new Id('1'),
    name: 'client',
    email: 'teste@teste',
    address: 'address'
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
        expect(result.address).toBe(client.address)
    })
})