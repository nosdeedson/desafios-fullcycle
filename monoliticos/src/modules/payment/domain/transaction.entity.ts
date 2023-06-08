import AggregateRoot from "../../domain/entity/aggregate-root.interface";
import BaseEntity from "../../domain/entity/base.entity";
import Id from "../../domain/entity/value-object/id.value-object"

type TransactionProps = {
    id?: Id;
    amount: number;
    orderId: string;
    status?: string;
    createAt?: Date;
    updateAt?: Date;
}

export default class TransactionEntity extends BaseEntity implements AggregateRoot{
    private _amount: number;
    private _orderId: string;
    private _status: string;

    constructor(props: TransactionProps){
        super(props.id);
        this._amount = props.amount;
        this._orderId  = props.orderId;
        this._status = props.status || 'pending';
        this.validate();
    }

    validate(): void{
        if(this._amount <= 0){
            throw new Error('amount must be greater than zero')
        }
    }

    decline(): void{
        this._status = 'declined'
    }

    aprove(): void{
        this._status = 'aproved'
    }

    process(): void {
        if( this._amount <= 100){
            this.decline();
        }else{
            this.aprove();
        }
    }

    get amount(): number{
        return this._amount
    }

    get orderId(): string{
        return this._orderId;
    }

    get status(): string{
        return this._status;
    }
}