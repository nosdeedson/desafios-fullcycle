import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Id from "../../../domain/entity/value-object/id.value-object";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./invoice-find.dto";

export default class InvoiceFindUseCase implements UseCaseInterface{
    
    constructor(private invoiceRepository: InvoiceGateway){}
    
    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const  result = await this.invoiceRepository.find(input.id);
        let itemsResult: { id: string; name: string; price: number; }[] = [ ];
        result.items.forEach(item => itemsResult.push({id: item.id.id, name: item.name, price: item.price}))
        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: {
                street: result.address.street,
                number: result.address.number,
                complement: result.address.complement,
                city: result.address.city,
                state: result.address.state,
                zipCode: result.address.zipCode,
            },
            items: itemsResult,
            total: result.total,
            createdAt:result.createAt,
        }
    }
    
}