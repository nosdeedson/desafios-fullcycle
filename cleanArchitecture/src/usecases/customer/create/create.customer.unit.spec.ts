import CreateCustomerUseCase from "./create.customer.usecase";

const input ={
    name: 'john',
    address: {
        city: 'city',
        number: 123,
        street: 'street',
        zip: 'zip',
    }
}

const MockRepository = () =>{
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    };
};

describe("unit test create customer use case", () =>{

    it("should create a customer",async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        const output = await customerCreateUseCase.execute(input);
        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address:{
                city: input.address.city,
                number: input.address.number,
                street: input.address.street,
                zip: input.address.zip,
            },
        });

    });

    it("should thrown an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);

        input.name = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should thrown an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
    
        input.address.street = "";
    
        await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
          "Street is required"
        );
    });
})



