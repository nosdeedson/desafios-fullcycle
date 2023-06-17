import { UpdatedAt } from "sequelize-typescript";
import Id from "../../domain/entity/value-object/id.value-object";
import InvoiceEntity from "../domain/invoice.entity";
import ProductEntity from "../domain/product.entity";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";

export default class InvoiceRepository implements InvoiceGateway{

    async generate(input: InvoiceEntity): Promise<InvoiceEntity> {
        
        const items = input.items.map((item) =>{
            return {
                id: item.id.id,
                name: item.name,
                price: item.price,
                createAt: item.createAt,
                updateAt: item.updateAt,
            }
        })
        
        await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            city: input.address.city,
            state: input.address.state,
            street: input.address.street,
            complement: input.address.complement,
            number: input.address.number,
            zipCode: input.address.zipCode,
            items: items,
            total: input.total,
            createAt: input.createAt,
            updateAt: input.updateAt,
        }, 
        {
            include: [{model: ProductModel}]
        })

        const result = await InvoiceModel.findOne({where: {id: input.id.id}, include: ["items"]});
        const entity = result.dataValues
        const products = entity.items.map((item: any) =>  {
            return new ProductEntity(item.dataValues.id, item.dataValues.name, item.dataValues.price, item.dataValues.createAt, item.dataValues.updateAt );
        } )
        const props = {
            street: entity.street,
            number: entity.number,
            city: entity.city,
            zipCode: entity.zipCode,
            state: entity.state,
            complement: entity.complement,
            id: new Id(entity.id),
            name: entity.name,
            document: entity.document,
            createAt: entity.createAt,
            updateAt: entity.updateAt,
            items: products
        }
        return new InvoiceEntity(props)
    }

    async find(input: string): Promise<InvoiceEntity> {
        const result = await InvoiceModel.findOne({where: {id: input}, include: ['items']});
        const entity = result.dataValues
        let itemsResults : ProductEntity[] = entity.items.map((item: any) =>  {
            return new ProductEntity(item.dataValues.id, item.dataValues.name, item.dataValues.price, item.dataValues.createAt, item.dataValues.updateAt );
        } )
        const props = {
            street: entity.street,
            number: entity.number,
            city: entity.city,
            zipCode: entity.zipCode,
            state: entity.state,
            complement: entity.complement,
            id: new Id(entity.id),
            name: entity.name,
            document: entity.document,
            createAt: entity.createAt,
            updateAt: entity.updateAt,
            items: itemsResults
        }

        return new InvoiceEntity(props)
    }
    
}