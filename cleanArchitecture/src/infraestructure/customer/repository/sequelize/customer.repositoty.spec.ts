import { where } from "sequelize";
import { Sequelize } from "sequelize-typescript"
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./cutomer.repository";

describe("Customer Repository test", () =>{
    
    function createCustomer(){
        let customer = new Customer("123", "customer 1");
        let address = new Address("street 1", 123, "zipcode", "city 1");
        customer.Address = address;
        return customer;
    }

    function expected(customer: Customer, customerModel: CustomerModel){
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zipcode,
            city: customer.address.city
        })
    }

    function expectedEquals(customer: Customer, customerBD: Customer){
        expect(customerBD).toEqual(customer);
    }

    let sequelize: Sequelize;

    beforeEach( async () =>{
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        });
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(() =>{
        sequelize.close();
    })

    it("should create a customer", async () =>{
        const customerRepository = new CustomerRepository();
        const customer = createCustomer();
        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({where: {id: "123"}});

        expected(customer, customerModel);
    });

    it("should update a customer", async () =>{
        const customerRepository = new CustomerRepository();
        const customer = createCustomer();
        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({ where: {id: "123"}});
        expected(customer, customerModel)

        customer.changeName("customer 2");
        await customerRepository.update(customer);
        const customerEditado = await CustomerModel.findOne({where : {id : "123"}});

        expected(customer, customerEditado);

    });

    it("should find a customer", async () =>{
        const customerRepository = new CustomerRepository();
        const customer = createCustomer();
        await customerRepository.create(customer);
        const customerBD = await customerRepository.find(customer.id);
        expectedEquals(customer, customerBD);

    });

    it("should find all customers", async () =>{
        const customerRepository = new CustomerRepository();
        const customer1 = createCustomer();
        await customerRepository.create(customer1);
        let customer2 = new Customer("124", "customer 2");
        let address = new Address("street 1", 123, "zipcode", "city 1");
        customer2.Address = address;
        await customerRepository.create(customer2);
        const customersModel = await customerRepository.findAll();
        const customersCreated = [customer1, customer2];
        expect(customersCreated).toEqual(customersModel)
    })
})