import { JSON, or } from "sequelize";
import { Sequelize } from "sequelize-typescript"
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/cutomer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order.item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order Repository init tests", () => {

    function createOrder(product: Product, customer: Customer) {
        const orderItem1 = new OrderItem("123", product.name, product.price, product.id, 2);
        const orderItem2 = new OrderItem("124", product.name, product.price, product.id, 2);
        const items: OrderItem[] = [orderItem1, orderItem2];
        const order = new Order("123", customer.id, items);
        order.total();
        return order;
    }

    function createOrders(product: Product, customer: Customer) {
        const orderItem1 = new OrderItem("123", product.name, product.price, product.id, 2);
        const orderItem2 = new OrderItem("124", product.name, product.price, product.id, 2);
        const orderItem3 = new OrderItem("125", product.name, product.price, product.id, 2);
        const orderItem4 = new OrderItem("126", product.name, product.price, product.id, 2);
        const items1: OrderItem[] = [orderItem1, orderItem2];
        const items2: OrderItem[] = [orderItem3, orderItem4];
        const order1 = new Order("123", customer.id, items1);
        order1.total();
        const order2 = new Order("124", customer.id, items2);
        order2.total();
        let orders: Order[] = []
        orders.push(order1)
        orders.push(order2)
        return orders;
    }

    async function createCustomer() {
        const customerRepository = new CustomerRepository();
        let customer = new Customer("123", "customer 1");
        let address = new Address("street 1", 123, "zipcode", "city 1");
        customer.Address = address;
        await customerRepository.create(customer);
        return customer;
    }

    async function createProduct() {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Prod 1", 10);
        await productRepository.create(product)
        const prod = await productRepository.find(product.id)
        return product;
    }

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        sequelize.addModels([OrderModel, OrderItemModel, CustomerModel, ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    })

    function expected(orderModel: OrderModel, order: Order){
        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: order.OrderItem[0].id,
                    name: order.OrderItem[0].name,
                    price: order.OrderItem[0].price,
                    quantity: order.OrderItem[0].quantity,
                    order_id: "123",
                    product_id: "123",
                },{
                    id: order.OrderItem[1].id,
                    name: order.OrderItem[1].name,
                    price: order.OrderItem[1].price,
                    quantity: order.OrderItem[1].quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        })
    }

    it("should create an order", async () => {
        const customer = await createCustomer();
        const product = await createProduct();

        const orderRepository = new OrderRepository();
        const order = createOrder(product, customer);
        await orderRepository.create(order);
        const orderModel = await OrderModel.findOne({where: {id: "123"}, include: ["items"]})
    
        expected(orderModel, order);
    });

    
    it("should update an order", async () =>{
        const customer = await createCustomer();
        const product = await createProduct();

        const orderRepository = new OrderRepository();
        const order = createOrder(product, customer);
        await orderRepository.create(order);
        const orderModel = await OrderModel.findOne({where: {id: "123"}, include: ["items"]})
        expected(orderModel, order);

        // updating
        order.OrderItem.forEach((item, index) =>{
            item.name = 'teste ' + (index + 1)
            item.quantity += 1
        });
        order.total()
        await orderRepository.update(order);

        const orderUpdated = await OrderModel.findOne({where: {id: '123'}, include: ["items"]})
        
        expected(orderUpdated, order);
    })

    it('should find one order', async () => {
        const customer = await createCustomer();
        const product = await createProduct();

        const orderRepository = new OrderRepository();
        const order = createOrder(product, customer);
        await orderRepository.create(order);
        const orderModel = await orderRepository.find(order.id);
        expect(orderModel).toEqual(order)
    });

    it('should find all order', async () => {
        const customer = await createCustomer();
        const product = await createProduct();

        const orderRepository = new OrderRepository();
        const orders = createOrders(product, customer);
        await orderRepository.create(orders[0]);
        await orderRepository.create(orders[1]);
        const orderModels = await orderRepository.findAll();
        expect(orderModels).toEqual(orders)
    })
})