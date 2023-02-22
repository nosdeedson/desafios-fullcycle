export default class OrderItem{
    private _id: string;
    private _produtoId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, name: string, price: number, produtoId: string, quantity: number){
        this._id = id;
        this._name = name;
        this._price = price,
        this._produtoId = produtoId;
        this._quantity = quantity;
    }

    validate(){
        if( this._quantity <= 0){
            throw Error("Quantity should be greater than zero");
        }
    }

    get price(): number{
        return this._price * this._quantity;
    }

    get quantity(): number{
        return this._quantity;
    }




}