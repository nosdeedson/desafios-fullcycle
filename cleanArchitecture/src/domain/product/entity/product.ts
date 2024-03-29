import Entity from "../../@shared/entity/entity.abstract";
import ProductValidatorFactory from "../factory/product.validator.factory";

export default class Product extends Entity{
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number){
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
        if(this.notification.hasErros()){
            throw new Error(this.notification.messages());
        }
    }

    changeName(name: string): void{
        this._name = name;
        this.validate();
    }

    changePrice(price: number){
        this._price = price;
        this.validate();
    }

    validate(){
        ProductValidatorFactory.create().validate(this);
    }

    get id(): string{
        return this._id;
    }

    set id(id: string){
        this._id = id;
        this.validate();
    }

    get name(): string{
        return this._name;
    }

    get price(): number{
        return this._price;
    }

}