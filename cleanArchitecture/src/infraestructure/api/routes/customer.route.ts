import express, { Response, Request } from "express";
import CreateCustomerUseCase from "../../../usecases/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/cutomer.repository";
import ListCustomerUseCase from "../../../usecases/customer/list/list.customer.usecase";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post("/",async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    
    try {
        const input = {
            name: req.body.name,
            address:{
                city: req.body.address.city,
                street: req.body.address.street,
                zip: req.body.address.zip,
                number: req.body.address.number
            }
        };

        const output = await usecase.execute(input);
        res.status(201).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
})

customerRoute.get("/",async ( req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    const output = await usecase.execute({});
    res.format({
        json: async () => res.status(200).send(output),
        xml: async () => CustomerPresenter.listXML(output)
    })

})