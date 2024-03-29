import { app, sequelize } from "../express"
import request from 'supertest'


describe("E2E test for customer", () =>{
    beforeEach (async () => {
        await sequelize.sync({force: true});
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: 'jose',
                address: {
                    street: 'street',
                    city: 'city',
                    number: 123,
                    zip: '123'
                }
            });
        
        expect(response.status).toBe(201);
        expect(response.body.name).toBe("jose");
        expect(response.body.address.street).toBe("street");
        expect(response.body.address.city).toBe("city");
        expect(response.body.address.zip).toBe("123");
        expect(response.body.address.number).toBe(123);
    })

    it("should fail to create a customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: 'falhou',
            });
        
        expect(response.status).toBe(500);
    })

    it("should list all customer",async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "pedro",
                address:{
                    city: "city",
                    street: 'street',
                    number:  123,
                    zip: '123'
                }
        });
        expect(response.status).toBe(201);

        const response1 = await request(app)
            .post("/customer")
            .send({
                name: "maria",
                address:{
                    city: "city 1",
                    street: 'street ',
                    number:  1234,
                    zip: '1234'
                }
        });
        expect(response1.status).toBe(201);

        const result = await request(app)
            .get('/customer')
            .send();
        expect(result.status).toBe(200)
        expect(result.body.customers.length).toBe(2)
        expect(result.body.customers[0].name).toBe('pedro')
        expect(result.body.customers[1].name).toBe('maria')

    })

    it("should list all customer in XML format",async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                name: "pedro",
                address:{
                    city: "city",
                    street: 'street',
                    number:  123,
                    zip: '123'
                }
        });
        expect(response.status).toBe(201);

        // const response1 = await request(app)
        //     .post("/customer")
        //     .send({
        //         name: "maria",
        //         address:{
        //             city: "city 1",
        //             street: 'street ',
        //             number:  1234,
        //             zip: '1234'
        //         }
        // });
        // expect(response1.status).toBe(201);

        const listXML = await request(app)
            .get("/customer")
            .set("Accept", "application/xml")
            .send();
        expect(listXML.status).toBe(200)
    })

})