import { Table, Model, PrimaryKey, Column } from "sequelize-typescript";

@Table({
    tableName: 'transaction',
    timestamps: false
})
export default class TransactionModel extends Model{

    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare orderId: string;

    @Column({allowNull: false})
    declare amount: number;

    @Column({allowNull: false})
    declare status: string;

    @Column({allowNull: false})
    declare createAt: Date;

    @Column({allowNull: false})
    declare updateAt: Date;
}
