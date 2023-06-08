import Id from "../../domain/entity/value-object/id.value-object";
import TransactionEntity from "../domain/transaction.entity";
import { PaymentGateway } from "../gateway/payment.gateway";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements PaymentGateway{
    async save(input: TransactionEntity): Promise<TransactionEntity> {
        await TransactionModel.create({
            id: input.id.id,
            orderId: input.orderId,
            amount: input.amount,
            createAt: input.createAt,
            updateAt: input.updateAt,
            status: input.status,
        })

        return new TransactionEntity({
            id: input.id,
            orderId: input.orderId,
            amount: input.amount,
            status: input.status,
            createAt: input.createAt,
            updateAt: input.updateAt
        })
    }
    
}