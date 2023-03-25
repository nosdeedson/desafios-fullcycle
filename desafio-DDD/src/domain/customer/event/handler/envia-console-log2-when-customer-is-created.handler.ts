import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog2HandlerWhenCustomerIsCreated implements EventHandlerInterface<CustomerCreatedEvent>{

    handle(event: CustomerCreatedEvent): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated", event.eventData)
    }
    

}