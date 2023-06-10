import AggregateRoot from "../../domain/entity/aggregate-root.interface";
import BaseEntity from "../../domain/entity/base.entity";
import Id from "../../domain/entity/value-object/id.value-object";

type ClientProps ={
    id?: Id;
    name: string;
    email: string;
    address: string;
    createAt?: Date;
    updateAt?: Date;
}

export default class ClientEntity extends BaseEntity implements AggregateRoot{
    private _name: string;
    private _email: string;
    private _address: string;

    constructor(props: ClientProps){
        super(props.id, props.createAt, props.updateAt)
        this._name = props.name;
        this._email = props.email;
        this._address = props.address
    }

    get name(): string{
        return this._name
    }

    get email(): string{
        return this._email
    }

    get address(): string{
        return this._address
    }

}