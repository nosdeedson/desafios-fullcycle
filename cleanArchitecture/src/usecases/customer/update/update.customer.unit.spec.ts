import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("john", new Address(
    'street',
    123,
    'zip',
    'city'
  ));

const input = {
    id: customer.id,
    name: "john update",
    address: {
        street: 'street update',
        number: 1234,
        zip: 'zip update',
        city: 'city update'
    }
}

const MockRepository = () =>{
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
    }
}

describe("Unit test for customer update use case", () => {
    
    it("should update a customer",async () => {
        const CustomerRepository = MockRepository();
        const customerUpdate =  new UpdateCustomerUseCase(CustomerRepository);

        const output = await customerUpdate.execute(input);

        expect(output).toEqual(input)
    })

})