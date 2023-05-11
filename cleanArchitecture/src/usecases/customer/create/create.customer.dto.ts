export interface InputCreateCustomerDto{
    name: string;
    address:{
        city: string;
        number: number;
        street: string;
        zip: string;
    }
}

export interface OutputCreateCustomerDto{
    id: string;
    name: string;
    address: {
        city: string
        number: number;
        street: string;
        zip: string;
    }
}