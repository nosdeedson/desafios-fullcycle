import { UpdatedAt } from "sequelize-typescript";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";
import Id from "../../domain/entity/value-object/id.value-object";

export default class ProductRepository implements ProductGateway{
    async add(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id.id,
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createAt: new Date(),
            updateAt: new Date(),
        })
    }

    async find(id: string): Promise<Product> {
        const result = await ProductModel.findOne({
            where: {id},
        });
        const product = result.dataValues
        if(!product){
            throw new Error(`Product with the id ${id} not found`)
        }
        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            purchasePrice: product.purchasePrice,
            stock: product.stock,
            createAt: product.createdAt,
            updateAt: product.updatedAt
        })
    }
    
}