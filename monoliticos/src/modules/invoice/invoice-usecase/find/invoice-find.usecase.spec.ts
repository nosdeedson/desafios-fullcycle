import Id from "../../../domain/entity/value-object/id.value-object"
import InvoiceEntity from "../../domain/invoice.entity"
import ProductEntity from "../../domain/product.entity"
import InvoiceFindUseCase from "./invoice-find.usecase";

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
});

const MockRepository = () =>{
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("find invoice unit test", () => {
    it("should find an invoice",async () => {
        const invoiceRepository = MockRepository();
        const usecase = new InvoiceFindUseCase(invoiceRepository);

        const result = await usecase.execute({id: '1'});
        expect(invoiceRepository.find).toHaveBeenCalled()
        expect(result.id).toBe('1')
        expect(result.items.length).toBe(2);
    })
})
