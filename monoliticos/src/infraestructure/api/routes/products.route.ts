import express, { Response, Request } from 'express';
import AddProductUseCase from '../../../modules/product-adm/usecase/add-prodct/add.product.usecase';
import ProductRepository from '../../../modules/product-adm/repository/product.repository';
import CheckStockUseCase from '../../../modules/product-adm/usecase/check-stock/check.stock.usecase';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    try {
        const usecase = new AddProductUseCase(new ProductRepository());
        const input = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock,
        }
        const output = await usecase.execute(input);
        res.status(201).send(output);
    } catch (error) {
        res.status(500).send(error)
    }
});

productRoute.get('/:productId', async (req: Request, res: Response) => {
    try {
        const usecase = new CheckStockUseCase(new ProductRepository());
        const id = req.params.productId
        console.log(id)
        const input = {productId: id}
        const output = await usecase.execute(input);
        res.status(200).send(output)
    } catch (error) {
        res.send(error);
    }
})