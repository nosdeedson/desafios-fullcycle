import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit test", () =>{

    it("should throw error when id is empty", () =>{
        expect(() =>{
            let customer = new Customer("", "Jhon");
        }).toThrowError("customer: Id is required");
    });

    it("should throw an error when name is empty", () =>{
        expect( () =>{
            let customer = new Customer("123", "");
        }).toThrowError("customer: Name is required");
    });

    it("should change name", () =>{
        const customer = new Customer("123", "john");
        customer.changeName("Jane");

        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () =>{
        const customer = new Customer("123", "John");
        const address = new Address("rua", 123, '12323-36', 'cidade');
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when address is undefined when you activate a customer", () =>{
        expect( () =>{
            const customer = new Customer("123", "jose");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a Customer");
    });

    it("should deactivate customer", () => {
        const customer = new Customer("123", "John");
        const address = new Address("rua", 123, '12323-36', 'cidade');
        customer.Address = address;
        customer.activate();
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("should add reward points", () =>{
        const customer = new Customer("123", "jose");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);


    })


});