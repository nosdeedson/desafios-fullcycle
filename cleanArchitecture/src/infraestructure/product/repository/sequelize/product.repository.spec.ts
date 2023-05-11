import { Sequelize } from "sequelize-typescript"
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository tests",  () => {

    function createProduct(): Product{
        return new Product("1", "Prod 1", 10);
    }

    let sequelize: Sequelize;
    
    beforeEach( async () =>{
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: "memory",
            logging: false,
            sync:{force: true}
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach( async () =>{
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = createProduct();
        await productRepository.create(product);
        const productModel = await ProductModel.findOne({where: {id: "1"}});

        expect( productModel.toJSON()).toStrictEqual({
            id: "1",
            name: 'Prod 1',
            price: 10
        });
    });

    it("should update a product", async () =>{
        const productRepository = new ProductRepository();
        const product = createProduct();
        await productRepository.create(product);
        const productModel = await ProductModel.findOne({where: {id: "1"}});
        expect( productModel.toJSON()).toStrictEqual({
            id: "1",
            name: 'Prod 1',
            price: 10
        });
        product.changeName("Prod 2");
        product.changePrice(20);
        await productRepository.update(product);
        const productModel2 = await ProductModel.findOne({where: {id: "1"}});
        expect( productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: 'Prod 2',
            price: 20
        });
    });

    it("should find a product", async () =>{
        const productRepository = new ProductRepository();
        const product = createProduct();
        await productRepository.create(product);
        const productModel = await ProductModel.findOne({where: {id: "1"}});
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Prod 1",
            price: 10
        })
    });

    it("should find all products", async () =>{
        const productRepository = new ProductRepository();
        const product = createProduct();
        await productRepository.create(product);
        const product2 = new Product("2", "Prod 2", 20);
        await productRepository.create(product2);

        const productsModel = await productRepository.findAll();
        const products = [product, product2];
        expect(products).toEqual(productsModel);
    });
});