import AggregateRoot from "../../domain/entity/aggregate-root.interface";
import BaseEntity from "../../domain/entity/base.entity";
import Id from "../../domain/entity/value-object/id.value-object";

type ProductEntityProps={
    id?: Id;
    name: string;
    price: number;
}

export default class ProductEntity extends BaseEntity implements AggregateRoot{

    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number, createAt: Date, updateAt: Date){
        super(new Id(id), createAt, updateAt)
        this._name = name;
        this._price = price;
    }

    get name(): string{
        return this._name;
    }

    get price(): number{
        return this._price
    }

}