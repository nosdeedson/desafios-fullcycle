import TransactionEntity from "../domain/transaction.entity";

export interface PaymentGateway{
    save(input: TransactionEntity): Promise<TransactionEntity>;
}