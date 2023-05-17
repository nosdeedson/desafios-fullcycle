import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends Entity {

    private _name: string= "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string){
        super();
        this._id = id;
        this._name = name;
        this._rewardPoints = 0;
        this.validate();
        if(this.notification.hasErros()){
            throw new Error(this.notification.messages());
        }
    }

    activate() {
        if(this._address === undefined){
            throw new Error("Address is mandatory to activate a Customer");
        }
        this._active = true;
    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

    changeName(name: string){
        this._name = name;
        this.validate();
    }

    deactivate() {
        this._active = false;
    }

    isActive() : boolean{
        return this._active;
    }

    validate() {
        if( this.id.length === 0 ){
            this.notification.addError({
                context: "customer",
                message: "Id is required"
            })
        }
        if(this._name.length === 0 ){
            this.notification.addError({
                context: "customer",
                message: "Name is required"
            })
        }
    }

    get id(): string{
        return this._id;
    }

    get address(): Address {
        return this._address;
    }

    set Address(address: Address){
        this._address = address;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints() : number{
        return this._rewardPoints
    }

    set rewardPoints(points: number){
        this._rewardPoints = points;
    }

}