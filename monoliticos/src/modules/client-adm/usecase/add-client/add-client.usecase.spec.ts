import ClientEntity from "../../domain/client.entity";
import AddClientUseCase from "./add-client.usecase";

const MockRepository = () =>{
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("add client use case test", () =>{
    it("should add a client",async () => {
        const clientRepository = MockRepository();
        const usecase = new AddClientUseCase(clientRepository);
        const input = { name: 'client', email: 'teste@teste', address: 'address'}
        const client = new ClientEntity(input);

        const result = await usecase.execute(client);
        expect(clientRepository.add).toHaveBeenCalled();
        expect(result.id).toBe(client.id.id)
        expect(result.name).toBe(client.name)
        expect(result.email).toBe(client.email)
        expect(result.address).toBe(client.address)
    })
})