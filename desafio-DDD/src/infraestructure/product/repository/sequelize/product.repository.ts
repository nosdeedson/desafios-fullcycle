import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.inteface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface{
    
    async create(entity: Product): Promise<void>{
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        })
    }

    async update(entity: Product): Promise<void>{
        await ProductModel.update({
            name: entity.name,
            price: entity.price,
        }, 
        {
            where:{
                id: entity.id
            }
        })
    }

    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({where: {id}});
        const product = new Product(productModel?.id, productModel?.name, productModel?.price)
        return product;
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        return productModels.map((item) => {
            return new Product(item.id, item.name, item.price);
        });
    }

}