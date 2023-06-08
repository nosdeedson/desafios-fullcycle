import Id from "../../../domain/entity/value-object/id.value-object"
import TransactionEntity from "../../domain/transaction.entity"
import ProcessPaymentUseCase from "./process-payment.usecase"

const MockRepository = (transaction: any) =>{
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction))
    }
}

describe("process payment usecase unit test", () =>{

    it("should aprove a transaction",async () => {
        const transaction = new TransactionEntity({
            id: new Id('1'),
            amount: 100,
            orderId: '1',
            status: 'aproved'
        });

        const transactionRepository = MockRepository(transaction);
        const usecase = new ProcessPaymentUseCase(transactionRepository)
        const result =  await usecase.execute({amount: 100, orderId: '1'})
        expect(transactionRepository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe('1');
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe('1');
        expect(result.status).toBe('aproved');
    });

    it("shouldn't aprove a transaction",async () => {
        const transaction = new TransactionEntity({
            id: new Id('2'),
            amount: 50,
            orderId: '2',
            status: 'declined'
        });

        const transactionRepository = MockRepository(transaction);
        const usecase = new ProcessPaymentUseCase(transactionRepository)
        const result =  await usecase.execute({amount: 50, orderId: '2'})
        expect(transactionRepository.save).toHaveBeenCalled();
        expect(result.transactionId).toBe('2');
        expect(result.amount).toBe(50);
        expect(result.orderId).toBe('2');
        expect(result.status).toBe('declined');

    })
})