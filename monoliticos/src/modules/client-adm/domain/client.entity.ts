import Product from "../../checkout/domain/product.entity";
import AggregateRoot from "../../domain/entity/aggregate-root.interface";
import BaseEntity from "../../domain/entity/base.entity";
import Id from "../../domain/entity/value-object/id.value-object";
import AddressClientDto from "./value-object/address";

type ClientProps ={
    id?: Id;
    name: string;
    email: string;
    document: string;
    address: AddressClientDto;
    createAt?: Date;
    updateAt?: Date;
}

export default class ClientEntity extends BaseEntity implements AggregateRoot{
    private _name: string;
    private _email: string;
    private _document: string;
    private _address: AddressClientDto;

    constructor(props: ClientProps){
        super(props.id, props.createAt, props.updateAt)
        this._name = props.name;
        this._email = props.email;
        this._document = props.document
        this._address = props.address
    }

    get name(): string{
        return this._name
    }

    get email(): string{
        return this._email
    }

    get address(): AddressClientDto{
        return this._address
    }

    get document(): string {
        return this._document;
    }

}