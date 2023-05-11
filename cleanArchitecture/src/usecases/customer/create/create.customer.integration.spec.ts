import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infraestructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infraestructure/customer/repository/sequelize/cutomer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

describe("Integration test unit for creating customer", () =>{

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
        const useCase = new CreateCustomerUseCase(customerRepository);

        const input = {
            name: "john",
            address: {
                city: "city",
                number: 123,
                street: "street",
                zip: 'zip'
            }
        };

        const result = await useCase.execute(input);
        const teste = await customerRepository.find(result.id)
        // console.log(teste)
        expect.any(result.id)
        expect(result.address).toEqual(input.address)
        expect(teste.id).toEqual(result.id)
        expect(teste.name).toEqual(result.name)
        
    })
})