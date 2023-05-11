import { Certificate } from "crypto";
import Order from "./order";
import OrderItem from "./order_item";


describe("Order tests unit", () =>{

    function createMock(): Order{
        const item1 = new OrderItem("1", "item 1", 10, "prod 1", 3);
        const item2 = new OrderItem("1", "item 2", 10, "prod 2", 2);
        let order = new Order("1", "customer 1", [item1, item2])
        return order;
    };

    it("should throw error when id is empty", () =>{
        expect( () =>{
            let order = createMock();
            order.id = "";
        }).toThrowError("Id is required");
    });

    it("should throw error when customerId is empty", () =>{
        let order = createMock();
        expect( () =>{
            order.customerId = "";
        }).toThrowError("Customer id is required");
    });

    it("should throw error when items are empty", () =>{
        let order = createMock();
        expect(() => {
            order.OrderItem = []
        }).toThrowError("Items is required");
    })

    it("should calculate total", () =>{
        let order = createMock();
        let total = order.total();
        expect(total).toBe(50);
    })

    it("should throw error if the item qte is less or equal zero", () =>{
        const i1 = new OrderItem("1", "item 1", 10, "prod 1", -3);
        const i2 = new OrderItem("1", "item 2", 10, "prod 2", -2);
        let order = createMock();
        expect(() => {
            order.OrderItem = [i1, i2];
        }).toThrowError("Quantity should be greater than zero");
    })

});