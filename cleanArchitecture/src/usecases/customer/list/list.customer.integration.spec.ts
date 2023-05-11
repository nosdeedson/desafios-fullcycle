import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/cutomer.repository";
import ListCustomerUseCase from "./list.customer.usecase";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("Integration test unit for listing customer", () =>{

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: {force: true}
        });
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a customer",async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new ListCustomerUseCase (customerRepository);

        const customer = new Customer("123", "john");
        const address = new Address("street", 123, "zip", "city");
        customer.Address = address;

        await customerRepository.create(customer);

        const customer1 = new Customer("1234", "jane");
        const address1 = new Address("street1", 1234, "zip1", "city1");
        customer1.Address = address1;

        await customerRepository.create(customer1);

        const results = await useCase.execute({});
        expect(results.customers.length).toBe(2)
        expect(results.customers[0].id).toBe('123')
        expect(results.customers[1].id).toBe('1234')
    })
})