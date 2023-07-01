import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import ProductInvoiceModel from "../repository/product.model";
import InvoiceEntity from "../domain/invoice.entity";
import ProductEntity from "../domain/product.entity";
import Id from "../../domain/entity/value-object/id.value-object";
import { InvoiceFacadeFactory } from "../factory/invoice-facade.factory";

const generateInput = () =>{
    return {
        name: 'invoice',
        document: '1234',
        street: 'street',
        number: '123',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zicode',
        items: [
            {
                id: '1',
                name: 'product1',
                price: 12,
            },
            {
                id: '2',
                name: 'product2',
                price: 21,
            }
        ],

    }
}

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

describe("invoice facade unit test", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([InvoiceModel, ProductInvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create an invoice',async () => {

        const invoice = generateInput() 
        const facade = InvoiceFacadeFactory.create();
        const result = await facade.generate(invoice);
        expect(result).toBeDefined()
        expect(result.id).toBeDefined()
        expect(result.name).toBe('invoice')
        expect(result.items.length).toBe(2)
        expect(result.items[0].id).toBe('1')
        expect(result.items[0].price).toBe(12)
        expect(result.items[1].id).toBe('2')
        expect(result.items[1].price).toBe(21)
    }, 50000)

    it('should find an invoice',async () => {
        const invoice = await createInvoice();
        const items = invoice.items.map((item) =>{
            return {
                id: item.id.id,
                name: item.name,
                purchasePrice: item.price,
                salesPrice: (item.price * 1.3),
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
        const facade = InvoiceFacadeFactory.create();
        const result = await facade.find({id: '1'});
        expect(result).toBeDefined()
        expect(result.id).toBeDefined()
        expect(result.name).toBe('invoice')
        expect(result.items.length).toBe(2)
        expect(result.items[0].id).toBe('1')
        expect(result.items[0].price).toBe(13)
        expect(result.items[1].id).toBe('2')
        expect(result.items[1].price).toBe(19.5)
    }, 50000)
})