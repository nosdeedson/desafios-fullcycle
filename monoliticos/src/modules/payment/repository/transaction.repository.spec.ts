import { Sequelize } from "sequelize-typescript";
import TransactionModel from "./transaction.model";
import TransactionRepository from "./transaction.repository";
import Id from "../../domain/entity/value-object/id.value-object";
import Transaction from "sequelize/types/transaction";
import TransactionEntity from "../domain/transaction.entity";

describe(" transaction repository unit test", () =>{

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync:{force: true}
        });
        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        sequelize.close();
    });

    it("should create a transaction",async () => {
        const transactionRepository = new TransactionRepository();
        const transaction = new TransactionEntity({
            id: new Id('1'),
            amount: 12,
            orderId: '1',
            status: 'declined',
        });

        transaction.aprove();
        const result = await transactionRepository.save(transaction);
        expect(result.id.id).toBe(transaction.id.id);
        expect(result.amount).toBe(transaction.amount);
        expect(result.orderId).toBe(transaction.orderId);
        expect(result.status).toBe(transaction.status);
    })


})