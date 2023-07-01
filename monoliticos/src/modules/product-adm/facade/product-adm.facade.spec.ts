import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import ProductRepository from "../repository/product.repository";
import InvoiceModel from "../../invoice/repository/invoice.model";
import ProductInvoiceModel from "../../invoice/repository/product.model";

describe("productadmfacade test", () =>{
    let sequelize: Sequelize;

    beforeAll(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ProductModel, InvoiceModel, ProductInvoiceModel])
        await sequelize.sync();
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: '1',
            name: 'product 1',
            description: 'product description',
            purchasePrice: 10,
            stock: 10
        };

        await productFacade.addProduct(input);
        const result = await ProductModel.findOne({where: {id: input.id}});
        const product = result.dataValues;
        expect(product).toBeDefined();
        expect(product.id).toBe(input.id);
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);
    });

    it("should find the stock of a product", async () => {
        const productFacade = ProductAdmFacadeFactory.create();
        try {
            await ProductModel.create({
                id: '2',
                name: 'product 2',
                description: 'description',
                purchasePrice: 10,
                salesPrice: (10 * 1.3),
                stock: 10,
                createAt: new Date(),
                updateAt: new Date(),
            });
    
            // finding the stock 
            const inputCheckDto = {productId: '2'}
            const result = await productFacade.checkStock(inputCheckDto);
            expect(result.productId).toEqual('2');
            expect(result.stock).toBe(10)
            
        } catch (error) {
            console.log(error)
            console.log('error')
        }
    }, 50000);

})