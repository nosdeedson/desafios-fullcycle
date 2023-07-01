import express, { Request, Response} from 'express'
import InvoiceFindUseCase from '../../../modules/invoice/usecase/find/invoice-find.usecase';
import InvoiceRepository from '../../../modules/invoice/repository/invoice.repository';
import InvoiceGenerateUseCase from '../../../modules/invoice/usecase/generate/invoice-generate.usecase';

export const invoiceRoute = express.Router();

invoiceRoute.post('/',async (req: Request, res: Response) => {
    const invoiceRepository = new InvoiceRepository();
    const items = req.body.items.map( (item: any) => { return { id: item.id, name: item.name, price: item.price} })
    try {
        const input = {
            name: req.body.name,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            items: items
        };

        const useCaseAdd = new InvoiceGenerateUseCase(invoiceRepository);
        const invoice = await useCaseAdd.execute(input);
        res.status(201).send(invoice);
    } catch (error) {
        res.status(500).send(error)
    }
})

invoiceRoute.get('/:invoiceId',async (req:Request, res: Response) => {
    try {
        const invoiceRepository = new InvoiceRepository();
        const id = req.params.invoiceId;
        const usecase = new InvoiceFindUseCase(invoiceRepository);
        const output = await usecase.execute({id: id});
        res.status(200).send(output)
    } catch (error) {
        res.status(500).send(error);
    }
})