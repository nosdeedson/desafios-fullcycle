import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import ProductRepository from "../repository/product.repository";

describe("productadmfacade test", () =>{
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ProductModel])
        await sequelize.sync();
    });

    afterEach(async () => {
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
        const product = result.dataValues
        expect(product).toBeDefined();
        expect(product.id).toBe(input.id);
        expect(product.name).toBe(input.name);
        expect(product.description).toBe(input.description);
        expect(product.purchasePrice).toBe(input.purchasePrice);
        expect(product.stock).toBe(input.stock);
    });

    it("should find the stock of a product", async () => {
        const productFacade = ProductAdmFacadeFactory.create();
        // adding the product to find the stock
        const input = {
            id: '1',
            name: 'product 1',
            description: 'product description',
            purchasePrice: 10,
            stock: 10
        };

        await productFacade.addProduct(input);

        // finding the stock 
        const inputCheckDto = {productId: '1'}
        const result = await productFacade.checkStock(inputCheckDto);
        expect(result.productId).toEqual(input.id);
        expect(result.stock).toEqual(input.stock)
    });

})