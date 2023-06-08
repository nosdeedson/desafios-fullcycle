import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/payment-facade.factory";

describe('payment facade unit test', () =>{

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a transaction",async () => {
        const props  = {orderId: '1', amount: 100};
        const facade = PaymentFacadeFactory.create();
        const result = await facade.process(props);
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe('1');
        expect(result.createAt).toBeDefined()
        expect(result.updateAt).toBeDefined()
        expect(result.status).toBeDefined()
        expect(result.transactionId).toBeDefined()

    })

})