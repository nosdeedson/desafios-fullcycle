import AggregateRoot from "../../domain/entity/aggregate-root.interface";
import BaseEntity from "../../domain/entity/base.entity";
import Id from "../../domain/entity/value-object/id.value-object"
import ProductEntity from "./product.entity";
import AddressEntity from "./value-object/address.entity";

type InvoiceEntityProps ={
    id?: Id;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items?: ProductEntity[];
    createAt?: Date;
    updateAt?: Date;
}

export default class InvoiceEntity extends BaseEntity implements AggregateRoot{
    
    private _name: string;
    private _document: string;
    private _address: AddressEntity;
    private _items: ProductEntity[];

    constructor(props: InvoiceEntityProps){
        super(props.id);
        this._name = props.name;
        this._document = props.document;
        this._address = new AddressEntity({
            street: props.street,
            state: props.state,
            number: props.number,
            complement: props.complement,
            zipCode: props.zipCode,
            city: props.city
        })
        this._items = props?.items
    }

    get name(): string{
        return this._name;
    }

    get document(): string{
        return this._document;
    }

    get items(): ProductEntity[]{
        return this._items
    }

    get address(): AddressEntity{
        return this._address
    }

    get total(): number{
        return this._items.reduce((soma, item) => soma + item.price, 0 )
    }
}