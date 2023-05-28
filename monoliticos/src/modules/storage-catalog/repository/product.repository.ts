import Id from "../../domain/entity/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";


export default class ProductRepository implements ProductGateway{

    async findAll(): Promise<Product[]> {
        const result = await ProductModel.findAll();

        return result.map((product) => {
            return new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            })
        })
    }

    async find(id: string): Promise<Product> {
        const result = await ProductModel.findOne({ where: {id: id}});
        const product = result.dataValues;
        const props = {
            id: product.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }
        return new Product(props);
    }

}