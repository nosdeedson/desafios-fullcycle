import OrderItem from "./order_item";

export default class Order {
    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    itemsIsEmpty(): boolean{
        if(this._items.length === 0){
            return true;
        }
        return false;
    }

    validate(){
        if( this._id.length === 0){
            throw new Error("Id is required");
        }

        if( this._customerId.length === 0){
            throw new Error("Customer id is required");
        }

        if( this._items.length === 0){
            throw new Error("Items is required");
        }

        if( this._items.some((item) => item.quantity <= 0)){
            throw new Error("Quantity should be greater than zero");
        }
    }

    total(): number{
        return this._items.reduce((acumulador, item) => acumulador + item.price, 0)
    }

    get customerId(): string{
        return this._customerId;
    }

    set customerId(customerId: string){
        this._customerId = customerId;
        this.validate();
    }

    get id(): string{
        return this._id;
    }

    set id(id: string){
        this._id = id;
        this.validate();
    }

    get OrderItem (): OrderItem[]{
        return this._items;
    }

    set OrderItem(items: OrderItem[]){
        this._items = items;
        this.validate();
    }
}