import { Model, or } from "sequelize";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order.item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface{
    
    async create(entity: Order): Promise<void> {
        const items = entity.OrderItem.map((item) =>{
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.produto_id,
                quantity: item.quantity
            }
        })
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            items: items,
            total: entity.total()
        }, 
        {
            include: [{ model: OrderItemModel}]
        })
    }

    async update(entity: Order): Promise<void> {
        let order = await OrderModel.findOne({where: {id: '123'}, include: ["items"]})
        
        entity.OrderItem.map((item) => {
            OrderItemModel.update({
                product_id: item.produto_id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }, { where: { id: item.id } });

        })

        OrderModel.update({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
        }, {where: {id: entity.id}})
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({where: {id: "123"}, include: ["items"]});
        const items = orderModel.items.map( (item) =>{
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        })
        const order = new Order(orderModel.id, orderModel.customer_id, items);
        return order;
    }
    
    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({include: ['items']})

        const orders = orderModels.map((item) => {
            const orderItems = item.items.map( (i) => {
                return new OrderItem(i.id, i.name, i.price, i.product_id, i.quantity);
            })
            return new Order(item.id, item.customer_id, orderItems);
        })
        return orders;
    }
    
    
}