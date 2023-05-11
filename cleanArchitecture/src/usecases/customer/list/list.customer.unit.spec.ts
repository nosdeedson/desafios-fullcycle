import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer = CustomerFactory.createWithAddress("john", new Address(
    'street',
    123,
    'zip',
    'city'
  ));

const customer2 = CustomerFactory.createWithAddress("john", new Address(
    'street 2',
    1234,
    'zip 2',
    'city 2'
  ));

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer, customer2])),
        update: jest.fn(),
    }
}

describe("unit test for listing customer", () =>{

    it("should list a customer", async () => {
        const repository = MockRepository();
        const useCase = new ListCustomerUseCase(repository);
    
        const output = await useCase.execute({});
    
        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer.id);
        expect(output.customers[0].name).toBe(customer.name);
        expect(output.customers[0].address.street).toBe(customer.address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
      });
})