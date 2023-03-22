import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

export default class CustomerAddressChangedEvent implements EventInterface{
    dateTimeOccured: Date;
    eventData: Customer;

    constructor(customer: Customer){
        this.eventData = customer;
        this.dateTimeOccured = new Date();
    }
}