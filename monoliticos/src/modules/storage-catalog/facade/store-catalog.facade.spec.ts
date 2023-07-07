import { Sequelize } from "sequelize-typescript";
import ProducStorageCatalogtModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe("storage catalog test unit", () =>{

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync:{force: true}
        });

        await sequelize.addModels([ProducStorageCatalogtModel, ]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close()
    });

    it("should find a product",async () => {
        await ProducStorageCatalogtModel.create({
            id: '1',
            name: 'product',
            description: 'product description',
            salesPrice: 10
        });
        const facade = StoreCatalogFacadeFactory.create();
        const input = {id: '1'}
        const result = await facade.find(input);
        expect(result.id).toBe('1')
        expect(result.name).toBe('product')
        expect(result.description).toBe('product description')
        expect(result.salesPrice).toBe(10)
    })

    it("should find a product",async () => {
        await ProducStorageCatalogtModel.create({
            id: '1',
            name: 'product',
            description: 'product description',
            salesPrice: 10
        });

        await ProducStorageCatalogtModel.create({
            id: '2',
            name: 'product2',
            description: 'product2 description',
            salesPrice: 20
        });
        const facade = StoreCatalogFacadeFactory.create();
        const result = await facade.findAll({});
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe('1')
        expect(result.products[0].name).toBe('product')
        expect(result.products[0].description).toBe('product description')
        expect(result.products[0].salesPrice).toBe(10)
        expect(result.products[1].id).toBe('2')
        expect(result.products[1].name).toBe('product2')
        expect(result.products[1].description).toBe('product2 description')
        expect(result.products[1].salesPrice).toBe(20)
    });

})