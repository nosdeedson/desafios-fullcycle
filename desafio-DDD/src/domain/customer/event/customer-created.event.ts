import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

export default class CustomerCreatedEvent implements EventInterface{
    dateTimeOccured: Date; 
    eventData: Customer;

    constructor(eventData: Customer){
        this.dateTimeOccured = new Date();
        this.eventData = eventData
    }
}