type AddressEntityProps = {
    street: string;
    number: string;
    city: string;
    zipCode: string;
    state: string;
    complement: string;
}


export default class AddressEntity {
    private _street: string;
    private _number: string;
    private _city: string;
    private _zipCode: string;
    private _state: string;
    private _complement: string;

    constructor(props: AddressEntityProps){
        this._city = props.city;
        this._number = props.number;
        this._street = props.street;
        this._zipCode = props.zipCode;
        this._state = props.state;
        this._complement = props.complement 
    }

    get street(): string{
        return this._street
    }

    get number(): string{
        return this._number;
    }

    get city(): string{
        return this._city;
    }

    get zipCode(): string{
        return this._zipCode;
    }

    get complement(): string{
        return this._complement;
    }

    get state(): string{
        return this._state
    }

}