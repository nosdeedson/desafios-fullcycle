import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";
import PaymentFacadeInterface, { PaymentFacadeInputDto, PaymentFacadeOutputDto } from "./payment-facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface{
    
    constructor(private usecasse: UseCaseInterface){}
    
    process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
        return this.usecasse.execute(input);
    }
    
}