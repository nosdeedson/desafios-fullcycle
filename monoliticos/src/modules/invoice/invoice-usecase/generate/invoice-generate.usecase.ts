import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceEntity from "../../domain/invoice.entity";
import ProductEntity from "../../domain/product.entity";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./invoice-generate.dtos";

export default class InvoiceGenerateUseCase implements UseCaseInterface{

    constructor(private invoiceRepository: InvoiceGateway){}
    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        let items: ProductEntity[] = [];
        input.items.forEach(item =>{
            items.push(new ProductEntity(item.id, item.name, item.price))
        })
        const props = {
            name: input.name,
            document: input.document,
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
            items: items
        };

        const invoice = new InvoiceEntity(props);

        const result = await this.invoiceRepository.generate(invoice);
        let itemsToReturn: any = []
        result.items.forEach(item => itemsToReturn.push({name: item.name, id: item.id.id, price: item.price}) )

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            street: result.address.street,
            number: result.address.number,
            complement: result.address.complement,
            city: result.address.city,
            state: result.address.state,
            zipCode: result.address.zipCode,
            items: itemsToReturn,
            total: result.total
        };
    }


}