import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("integration test unit for listing producst", () =>{
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory',
            logging: false,
            sync: {force: true}
        })

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should list products", async () => {  
        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);
        const product = new Product("123", "product", 123)
        const product1 = new Product("1234", "product1", 123)

        await productRepository.create(product)
        await productRepository.create(product1)

        const results = await useCase.execute({})

        expect(results.products[0].id).toEqual(product.id)
        expect(results.products[0].name).toEqual(product.name)
        expect(results.products[0].price).toEqual(product.price)
        expect(results.products[1].id).toEqual(product1.id)
        expect(results.products[1].name).toEqual(product1.name)
        expect(results.products[1].price).toEqual(product1.price)
    })
})