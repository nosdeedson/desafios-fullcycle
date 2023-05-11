export interface InputUpdateCustomerDto{
    id: string;
    name: string;
    address :{
        city: string;
        number: number;
        street: string;
        zip: string;
    }
}

export interface OutputUpdateCustomerDto{
    id: string;
    name: string;
    address :{
        city: string;
        number: number;
        street: string;
        zip: string;
    }
}