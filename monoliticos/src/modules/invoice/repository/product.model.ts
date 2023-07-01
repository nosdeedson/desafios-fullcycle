import { Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import OrderModel from "../../checkout/repository/order.model";


@Table({ 
    tableName: 'products',
    timestamps: false
})
export default class ProductInvoiceModel extends Model{

    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: true})
    declare description: string;

    @Column({allowNull: true})
    declare purchasePrice: number;

    @Column({allowNull: true})
    declare salesPrice: number;

    @Column({allowNull: true})
    declare stock: number;

    @Column({allowNull: true})
    declare createAt: Date;

    @Column({allowNull: true})
    declare updateAt: Date;

    @ForeignKey(() => InvoiceModel)
    declare invoice_id: string;

    @ForeignKey(() => OrderModel)
    declare order_id: string;

    // @BelongsTo(() => InvoiceModel)
    // declare invoice: InvoiceModel;

}