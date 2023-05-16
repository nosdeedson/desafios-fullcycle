import {app, sequelize} from '../express'
import request from 'supertest'



describe("E2E test for product", () => {
    
    beforeAll(async () =>{
        await sequelize.sync({force: true})
    })
    
    afterAll(async () => {
        await sequelize.close();
    })

    it("should create a product",async () => {
        const response = await request(app)
            .post("/product")
            .send({
                id: '123',
                name: "product",
                price: 123
            });
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("product");
        expect(response.body.price).toBe(123);
        expect(response.body.id).toBe("123");
    })

    it("should fail to create a product",async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "fail"
            });
        expect(response.status).toBe(500);
    })

    it("should list all products",async () => {
        const response = await request(app)
            .post("/product")
            .send({
                id: '124',
                name: "product 1",
                price: 123
            });
        expect(response.status).toBe(201);

        const response1 = await request(app)
            .post("/product")
            .send({
                id: '125',
                name: "product 2",
                price: 12
            });
        expect(response.status).toBe(201);

        const result = await request(app)
            .get("/product")
            .send();
        
        expect(result.status).toBe(200);
        expect(result.body.products.length).toBe(3);
        expect(result.body.products[0].name).toBe('product');
        expect(result.body.products[1].name).toBe('product 1');
    });
})