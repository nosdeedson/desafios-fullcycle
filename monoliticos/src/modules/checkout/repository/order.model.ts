import {Table, Model, PrimaryKey, Column, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import ProductOrder from "./product.order.model";
import ClientOrder from "./client.order.model";
import ClientEntity from "../../client-adm/domain/client.entity";
import ClientModel from "../../client-adm/repository/client.model";

@Table({
    tableName: 'order',
    timestamps: false
})
export default class OrderModel extends Model{

    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @ForeignKey(() => ClientOrder)
    declare client_id: string;

    @BelongsTo(() => ClientOrder)
    declare client: ClientOrder;

    @HasMany(() => ProductOrder)
    declare products?: ProductOrder[];
}