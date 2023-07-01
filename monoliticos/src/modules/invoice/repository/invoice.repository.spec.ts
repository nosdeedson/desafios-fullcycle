import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import InvoiceEntity from "../domain/invoice.entity";
import ProductEntity from "../domain/product.entity";
import Id from "../../domain/entity/value-object/id.value-object";
import ProductInvoiceModel from "./product.model";

describe('invoice respository test unit', () =>{

    async function createInvoice(){
        return new InvoiceEntity({
            id: new Id('1'),
            name: 'invoice',
            document: '123456456',
            street: 'street',
            number: '123',
            complement: 'complement',
            city: 'city',
            state: 'state',
            zipCode: 'zipcode',
            items: [new ProductEntity('1', 'product', 10, new Date(), new Date()), new ProductEntity('2', 'product2', 15, new Date(), new Date())],
        });
    }
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([ProductInvoiceModel, InvoiceModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should generate an invoice",async () => {
        const invoiceRepository = new InvoiceRepository();
        const invoice = await createInvoice();
        
        const result = await invoiceRepository.generate(invoice);
        expect(result.id.id).toBe('1')
        expect(result.items.length).toBe(2);
        expect(result.items[0].id.id).toBe('1');
        expect(result.items[1].id.id).toBe('2');
        expect(result.name).toBe('invoice')
        expect(result.document).toBe('123456456')
        expect(result.address.street).toBe('street')
        expect(result.address.city).toBe('city')
    })


    it("should find an invoice",async () => {
        const invoice = await createInvoice();
        const items = invoice.items.map((item) =>{
            return {
                id: item.id.id,
                name: item.name,
                salesPrice: item.price,
                createAt: item.createAt,
                updateAt: item.updateAt,
            }
        })

        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            city: invoice.address.city,
            state: invoice.address.state,
            street: invoice.address.street,
            complement: invoice.address.complement,
            number: invoice.address.number,
            zipCode: invoice.address.zipCode,
            items: items,
            total: invoice.total,
            createAt: invoice.createAt,
            updateAt: invoice.updateAt,
        },
            {
                include: [{ model: ProductInvoiceModel }]
            });

        const invoiceRepository = new InvoiceRepository();
                
        const result = await invoiceRepository.find('1');
        expect(result.items.length).toBe(2)
        expect(result.items[0].id.id).toBe('1')
        expect(result.items[1].id.id).toBe('2')
        expect(result.id.id).toBe('1')
        expect(result.name).toBe('invoice')
        expect(result.document).toBe('123456456')
        expect(result.address.street).toBe('street')
        expect(result.address.city).toBe('city')
    }, 50000)
})