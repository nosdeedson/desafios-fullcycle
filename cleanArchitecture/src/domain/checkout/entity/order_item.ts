export default class OrderItem{
    private _id: string;
    private _produto_id: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, name: string, price: number, produtoId: string, quantity: number){
        this._id = id;
        this._name = name;
        this._price = price,
        this._produto_id = produtoId;
        this._quantity = quantity;
    }

    validate(){
        if( this._quantity <= 0){
            throw Error("Quantity should be greater than zero");
        }
    }

    get id(): string {
        return this._id;
    }

    get produto_id(): string{
        return this._produto_id
    }

    get price(): number{
        return this._price;
    }

    get quantity(): number{
        return this._quantity;
    }

    set quantity(qtd: number){
        this._quantity = qtd;
    }

    get name(): string{
        return this._name
    }

    set name(name: string){
        this._name = name
    }



}