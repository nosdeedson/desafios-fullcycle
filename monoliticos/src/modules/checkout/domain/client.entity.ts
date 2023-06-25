import BaseEntity from "../../domain/entity/base.entity";
import AggregateRoot from "../../domain/entity/aggregate-root.interface";
import Id from "../../domain/entity/value-object/id.value-object";
import AddressDto from "./value-object/address.dto";

type ClientProps ={
    id?: Id;
    name: string;
    email: string;
    address?: AddressDto;
    document: string
}

export default class Client extends BaseEntity implements AggregateRoot{

    private _name: string;
    private _email: string;
    private _address?: AddressDto;
    private _document: string;

    constructor(props: ClientProps){
        super(props.id);
        this._name = props.name;
        this._email = props.email;
        this._address= props.address;
        this._document = props.document
    }

    get name(): string{
        return this._name;
    }

    get email(): string{
        return this._email;
    }

    get address(): AddressDto{
        return this._address;
    }

    get document(): string{
        return this._document;
    }
}