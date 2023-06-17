import { Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";


@Table({ 
    tableName: 'product',
    timestamps: false
})
export default class ProductModel extends Model{

    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;
    
    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;

    @ForeignKey(() => InvoiceModel)
    declare invoice_id: string;

    // @BelongsTo(() => InvoiceModel)
    // declare invoice: InvoiceModel;

    @Column({allowNull: false})
    declare createAt: Date;

    @Column({allowNull: false})
    declare updateAt: Date;

}