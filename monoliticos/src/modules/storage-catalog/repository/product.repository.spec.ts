import { Sequelize } from "sequelize-typescript";
import Id from "../../domain/entity/value-object/id.value-object";
import Product from "../domain/product.entity";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository"
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";


describe("product repository test unit", () =>{

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync:{force: true}
        });
        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        sequelize.close();
    });

    it("should find all products test unit",async () => {
        await ProductModel.create({
            id: '1',
            name: 'product',
            description: 'product description',
            salesPrice: 10
        });

        await ProductModel.create({
            id: '2',
            name: 'product 1',
            description: 'product2 description',
            salesPrice: 2
        });
        
        const productRepository = new ProductRepository();
        const usecase = new FindAllProductsUseCase(productRepository);

        const result = await usecase.execute();

        expect(result.products.length).toBe(2)
        expect(result.products[0].id).toEqual('1')
        expect(result.products[1].id).toEqual('2')
    })

    it("should find a product test unit",async () => {
        await ProductModel.create({
            id: '1',
            name: 'product',
            description: 'product description',
            salesPrice: 10
        });
        
        const productRepository = new ProductRepository();
        const usecase = new FindProductUseCase(productRepository);
        const input = {id: '1'}
        const result = await usecase.execute(input);
        expect(result.id).toEqual('1')
        expect(result.name).toEqual('product')
    })

})