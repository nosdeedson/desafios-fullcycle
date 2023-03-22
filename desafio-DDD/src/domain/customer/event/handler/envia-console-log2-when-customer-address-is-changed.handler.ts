import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChanged from "../customer-address-changed.event";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLog2HandlerWhenCustomerAddressIsChanged implements EventHandlerInterface<CustomerAddressChanged>{
    handle(event: CustomerCreatedEvent): void {
        console.log("Endereço do Cliente: {", event.eventData.id , "}, {", event.eventData.name, "} alterado para: ", event.eventData.address )
    }
}