import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model";
import Id from "../../domain/entity/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductRepository from "./product.repository";

describe("ProductRepository", () =>{

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

    it("should create a product",async () => {
        const productProps ={
            id: new Id("1"),
            name: 'product',
            description: 'product description',
            purchasePrice: 10,
            stock: 122,
        };

        const product = new Product(productProps);
        const productRepoditory = new ProductRepository();
        await productRepoditory.add(product);

        const productDB = await ProductModel.findOne({
            where: {id: product.id.id}
        })
        const result = productDB.dataValues;
        expect(productProps.id.id).toEqual(result.id)
        expect(productProps.name).toEqual(result.name)
        expect(productProps.description).toEqual(result.description)
        expect(productProps.purchasePrice).toEqual(result.purchasePrice)
        expect(productProps.stock).toEqual(result.stock)
    })

    it("should find one product",async () => {
        const productRepoditory = new ProductRepository();
        ProductModel.create({
            id: "1",
            name: 'product',
            description: 'product description',
            purchasePrice: 123,
            stock: 12,
            createAt: new Date(),
            updateAt: new Date(),
        });

        const productBD = await productRepoditory.find('1');
        expect( productBD.id.id).toEqual('1');
        expect( productBD.name).toEqual('product');
        expect( productBD.description).toEqual('product description');
    })
})