import Id from "../../../domain/entity/value-object/id.value-object"
import InvoiceEntity from "../../domain/invoice.entity"
import ProductEntity from "../../domain/product.entity"
import InvoiceGenerateUseCase from "./invoice-generate.usecase"

const invoice = new InvoiceEntity({
    id: new Id('1'),
    name: 'invoice',
    document: '123456456',
    street: 'street',
    number: '123',
    complement: 'complement',
    city: 'city',
    state: 'state',
    zipCode: 'zipcode',
    items: [new ProductEntity('1', 'product', 10), new ProductEntity('2', 'product2', 15)],
})

const MockRepository = () => {
    return {
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        find: jest.fn()
    }
}

describe('invoice generate unit test', () =>{

    it('should generate an invoice',async () => {
        const invoiceRepository = MockRepository();
        const usecase = new  InvoiceGenerateUseCase(invoiceRepository);
        const input = {
            name: 'string',
            document: 'string',
            street: 'string',
            number: 'string',
            complement: 'string',
            city: 'string',
            state: 'string',
            zipCode: 'string',
            items: [ {
                id: 'string',
                name: 'string',
                price: 12,
            }]
        }
        const result = await usecase.execute(input)
        expect(invoiceRepository.generate).toHaveBeenCalled();
        expect(result.items.length).toBe(2)
        expect(result.total).toBe(25)
        expect(result.document).toBe('123456456')
    })
})