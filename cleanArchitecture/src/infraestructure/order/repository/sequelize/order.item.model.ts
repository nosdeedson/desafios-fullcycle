import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";

@Table({tableName: "order_items", timestamps: false})
export default class OrderItemModel extends Model{

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;

    @Column({allowNull: false})
    declare quantity: number;

    @ForeignKey(() => OrderModel)
    declare order_id: OrderModel;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;



}