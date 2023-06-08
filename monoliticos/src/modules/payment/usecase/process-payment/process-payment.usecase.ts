import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import TransactionEntity from "../../domain/transaction.entity";
import { PaymentGateway } from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface{

    constructor(private transactionRepository: PaymentGateway){}
    
    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        
        const transaction = new TransactionEntity({
            amount: input.amount,
            orderId: input.orderId,
        });

        transaction.process();

        const persisted = await this.transactionRepository.save(transaction);
        return {
            transactionId: persisted.id.id,
            orderId: persisted.orderId,
            amount: persisted.amount,
            status: persisted.status,
            createAt: persisted.createAt,
            updateAt: persisted.updateAt
        }
        
    }

}