import {Table, Model, PrimaryKey, Column, HasMany } from "sequelize-typescript";
import ProductModel from "./product.model";


@Table({
    tableName: 'invoice',
    timestamps: false
})
export default class InvoiceModel extends Model{

    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare document: string;

    @Column({allowNull: false})
    declare city: string;

    @Column({allowNull: false})
    declare street: string;

    @Column({allowNull: false})
    declare number: string;

    @Column({allowNull: false})
    declare zipCode: string;

    @Column({allowNull: false})
    declare state: string;

    @Column({allowNull: false})
    declare complement: string;

    @Column({allowNull: false})
    declare total: number;

    @HasMany(() => ProductModel, {onUpdate: 'CASCADE'})
    declare items: ProductModel[];

    @Column({allowNull: false})
    declare createAt: Date;

    @Column({allowNull: false})
    declare updateAt: Date;
}