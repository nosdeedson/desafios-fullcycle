import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceEntity from "../../domain/invoice.entity";
import ProductEntity from "../../domain/product.entity";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./invoice-generate.dtos";

export default class InvoiceGenerateUseCase implements UseCaseInterface{

    constructor(private invoiceRepository: InvoiceGateway){}
    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        
        const product1 = new ProductEntity({name: 'product1', price: 10})
        const product2 = new ProductEntity({name: 'product2', price: 20})

        const items = [product1, product2]

        const props = {
            name: 'teste',
            document: '123456789',
            street: 'street',
            number: '10',
            complement: 'complement',
            city: 'city',
            state: 'state',
            zipCode: 'zipCode',
            items: items,
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