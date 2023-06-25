import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Order from "../domain/order.entity";
import OrderModel from "./order.model";

@Table({
    tableName: 'product_order',
    timestamps: false
})
export default class ProductOrder extends Model{

    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare salesPrice: number;

    @ForeignKey(() => OrderModel)
    declare order_id: string;

}