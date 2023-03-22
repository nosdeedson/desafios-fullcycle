import Customer from "../../customer/entity/customer";
import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import EnviaConsoleLog1HandlerWhenCustomerIsCreated from "../../customer/event/handler/envia-console-log1-when-customer-is-created.handler";
import EnviaConsoleLog2HandlerWhenCustomerAddressIsChanged from "../../customer/event/handler/envia-console-log2-when-customer-address-is-changed.handler";
import Address from "../../customer/value-object/address";
import EventDispatcher from "./event-dispatcher"

describe("Customer events tests", () =>{

    it("it should register an customer event handler", () =>{
        const customeDispatcher = new EventDispatcher();
        const customerHandler = new EnviaConsoleLog1HandlerWhenCustomerIsCreated();
        const customerAddressHandler = new EnviaConsoleLog2HandlerWhenCustomerAddressIsChanged();

        customeDispatcher.register("CustomerCreatedEvent", customerHandler);
        customeDispatcher.register("CustomerAddressChangedEvent", customerAddressHandler);

        expect(customeDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toBeDefined();
        expect(customeDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toBeDefined();
        expect(customeDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(customeDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
        expect(customeDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(customerHandler)
        expect(customeDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(customerAddressHandler)
    })

    it("it should unregister an customer event", () =>{
        const customeDispatcher = new EventDispatcher();
        const customerHandler = new EnviaConsoleLog1HandlerWhenCustomerIsCreated();
        const customerAddressHandler = new EnviaConsoleLog2HandlerWhenCustomerAddressIsChanged();

        customeDispatcher.register("CustomerCreatedEvent", customerHandler);
        customeDispatcher.register("CustomerAddressChangedEvent", customerAddressHandler);

        expect(customeDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toBeDefined();
        expect(customeDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(customerHandler);

        customeDispatcher.unregister("CustomerCreatedEvent", customerHandler);
        expect(customeDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(customeDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0)
    });

    it("it should unregister all customer event handlers", () =>{
        const customeDispatcher = new EventDispatcher();
        const customerHandler = new EnviaConsoleLog1HandlerWhenCustomerIsCreated();
        const customerAddressHandler = new EnviaConsoleLog2HandlerWhenCustomerAddressIsChanged();

        customeDispatcher.register("CustomerCreatedEvent", customerHandler);
        customeDispatcher.register("CustomerAddressChangedEvent", customerAddressHandler);

        expect(customeDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toBeDefined();
        expect(customeDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(customerHandler);

        customeDispatcher.unregisterAll();
        expect(customeDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    })

    it("should notify all event handlers", () =>{
        const customerDispaticher = new EventDispatcher();
        const customerHandler = new EnviaConsoleLog1HandlerWhenCustomerIsCreated();
        const customerAddressHandler = new EnviaConsoleLog2HandlerWhenCustomerAddressIsChanged();
        
        let spyEventHandler = jest.spyOn(customerHandler, "handle");

        customerDispaticher.register("CustomerCreatedEvent", customerHandler);
        customerDispaticher.register("CustomerAddressChangedEvent", customerAddressHandler);

        expect(customerDispaticher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(customerHandler);

        const customer = new Customer("123", "John");
        const address = new Address("rua", 123, '12323-36', 'cidade');
        customer.Address = address;

        const customerCreatedEvent = new CustomerCreatedEvent(customer);
        customerDispaticher.notify(customerCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();

        spyEventHandler =jest.spyOn(customerAddressHandler, "handle");
        const address1 = new Address("outra rua", 123, '12323-36', 'cidade');
        customer.Address = address1;
        const customerAddressChanged = new CustomerAddressChangedEvent(customer)
        customerDispaticher.notify(customerAddressChanged);
        expect(spyEventHandler).toHaveBeenCalled()

    })
    
})