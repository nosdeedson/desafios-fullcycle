import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infraestructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infraestructure/product/repository/sequelize/product.repository";
import CreateProductUsecase from "./create.product.usecase";

describe("Integration test unit for creatinf product", () =>{

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

    it("should create a product",async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUsecase(productRepository);

        const input = {
            id: '123',
            name: 'product',
            price: 10
        }

        const result = await usecase.execute(input);
        const teste = await productRepository.find("123");
        expect(teste.id).toEqual(result.id);
        expect(teste.name).toEqual(result.name);
        expect(teste.price).toEqual(result.price);
    })
})