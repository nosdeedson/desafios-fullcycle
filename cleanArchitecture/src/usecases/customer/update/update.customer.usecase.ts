import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface;
    constructor(CustomerRepository: CustomerRepositoryInterface){
        this.customerRepository = CustomerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {

        const customer = await this.customerRepository.find(input.id);
        customer.changeName(input.name);
        let address = new Address(
            input.address.street,
            input.address.number,
            input.address.zip, 
            input.address.city
        );
        customer.Address = address;
        await this.customerRepository.update(customer);
        return {
            id: customer.id,
            name: customer.name,
            address :{
                street: customer.address.street,
                number: customer.address.number,
                zip: customer.address.zipcode,
                city: customer.address.city,
            }
        }
    }

}