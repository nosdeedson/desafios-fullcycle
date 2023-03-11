import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface{
    
    async create(entity: Customer): Promise<void>{
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            zipcode: entity.address.zipcode,
            city: entity.address.city,
            number: entity.address.number,
            rewardPoints: entity.rewardPoints,
            active: entity.isActive(),
        })
    }

    async find(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({where: {id: id}});
        let customer = new Customer(customerModel.id, customerModel.name);
        customer.rewardPoints = customerModel.rewardPoints;
        const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);
        customer.Address = address;
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customersModel = await CustomerModel.findAll();
        const customers = customersModel.map((customerModel) => {
            const customer = new Customer(customerModel.id, customerModel.name);
            customer.addRewardPoints(customerModel.rewardPoints);
            if(customerModel.active){
                customer.activate();
            }
            const address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city );
            customer.Address = address;
            return customer;
        });
        return customers;
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            zipcode: entity.address.zipcode,
            city: entity.address.city,
            number: entity.address.number,
            rewardPoints: entity.rewardPoints,
            active: entity.isActive(),
        }, 
        {
            where: {id : "123"}
        })
    }
}