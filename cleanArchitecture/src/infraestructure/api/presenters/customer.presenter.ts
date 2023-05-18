import { number } from "yup";
import { OutputListCustomerDto } from "../../../usecases/customer/list/list.customer.dto";
import {toXML} from 'jstoxml'
import address from "../../../domain/customer/value-object/address";


export default class CustomerPresenter{
    static listXML(data: OutputListCustomerDto): string{
        const xmlOption = {
            header: true,
            indent: " ",
            newline: '\n',
            allowEmpty: true
        }

        return toXML({
            customers:{
                customer: data.customers.map((customer) =>({
                    id: customer.id,
                    name: customer.name,
                    address: {
                        city: customer.address.city,
                        number: customer.address.number,
                        zip: customer.address.zip,
                        street: customer.address.street,
                    }
                }))
            }
        }, xmlOption)
    }
}