import express, {Response, Request} from 'express'
import CreateProductUsecase from '../../../usecases/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductUseCase from '../../../usecases/product/list/list.product.usecase';

export const productRoute = express.Router();


productRoute.post("/",async (req: Request, res: Response) => {
    const usecase = new CreateProductUsecase(new ProductRepository());
    try {
        const input = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price
        }
        const output = await usecase.execute(input);
        res.status(201).send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})

productRoute.get("/",async (req:Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    const output = await usecase.execute({});
    res.status(200).send(output)
})