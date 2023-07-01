import express, { Response, Request } from 'express';
import PlaceOrderUseCase from '../../../modules/checkout/usecase/place-order/place-order.usecase';
import ClientAdmFacadeFactory from '../../../modules/client-adm/factory/client-adm.facade.factory';
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/facade.factory';
import StoreCatalogFacadeFactory from '../../../modules/storage-catalog/factory/facade.factory';
import { InvoiceFacadeFactory } from '../../../modules/invoice/factory/invoice-facade.factory';
import PaymentFacadeFactory from '../../../modules/payment/factory/payment-facade.factory';
import OrderRepository from '../../../modules/checkout/repository/order.repository';

export const checkoutRoute = express.Router();


checkoutRoute.post('/',async (req: Request, res: Response) => {
    try {
        const clientFacade = ClientAdmFacadeFactory.create();
        const productFacade = ProductAdmFacadeFactory.create();
        const storeFacade = StoreCatalogFacadeFactory.create();
        const checkoutRepository = new OrderRepository();
        const invoice = InvoiceFacadeFactory.create();
        const payment = PaymentFacadeFactory.create();
        const usecase = new PlaceOrderUseCase(
            clientFacade, 
            productFacade, 
            storeFacade, 
            checkoutRepository,
            invoice,
            payment);
        const products = req.body.products.map((p: { productId: any; }) => { return {productId: p.productId}})
        const input = {clientId: req.body.clientId, products: products};
        const output = await usecase.execute(input);
        res.status(201).send(output);
    } catch (error: any) {
        console.log(error)
        res.status(500).send(error.message);
    }
});

checkoutRoute.get('/',async (req: Request, res: Response) => {
    try {
        res.status(200).send('created')
    } catch (error) {
        res.status(500).send(error);
    }
});