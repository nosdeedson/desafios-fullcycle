import { BelongsTo, Column, DefaultScope, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "../../invoice/repository/invoice.model";

@Table({
    tableName: 'products',
    timestamps: false, 
})
export default class ProductModel extends Model{
    
    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
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
}