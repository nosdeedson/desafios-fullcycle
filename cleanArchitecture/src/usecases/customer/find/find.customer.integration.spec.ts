import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/cutomer.repository";
import FindCustomerUseCase from "./find.customer.usecase";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("Test find customer use case", () =>{
    let sequilize: Sequelize;
    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory",
            logging: false,
            sync: {force: true},
        })
        await sequilize.addModels([CustomerModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    })

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "john");
        const address = new Address("street", 123, "zip", "city");
        customer.Address = address;

        await customerRepository.create(customer);

        const input = { id: "123"};

        const output ={
            id: '123',
            name: 'john',
            address: {
                street: "street",
                number: 123,
                city: 'city',
                zip: 'zip',
            }
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(output);
    })

})