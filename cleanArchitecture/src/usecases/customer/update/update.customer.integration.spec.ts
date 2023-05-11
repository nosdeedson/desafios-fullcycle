import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/cutomer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe("Integration unit test for updating customer", () =>{
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

    it("it should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new UpdateCustomerUseCase(customerRepository);

        const customer = new Customer("123", "john");
        const address = new Address("street", 123, "zip", "city");
        customer.Address = address;

        await customerRepository.create(customer);

        const input = {
            id: "123",
            name: "edson",
            address: {
                city: "itajuba",
                number: 123,
                street: "mendonça",
                zip: "37501",
            }
        }
        const result = await useCase.execute(input);
        // console.log(result)
        expect(result).toEqual(input)
    })
})