import InvoiceFacade from "../facade/invoice-facade";
import { InvoiceFacadeInterface } from "../facade/invoice-facade.interface";
import InvoiceRepository from "../repository/invoice.repository";
import InvoiceFindUseCase from "../usecase/find/invoice-find.usecase";
import InvoiceGenerateUseCase from "../usecase/generate/invoice-generate.usecase";

export class InvoiceFacadeFactory{
    static create(): InvoiceFacadeInterface{
        const repository = new InvoiceRepository();
        const generateUseCase = new InvoiceGenerateUseCase(repository);
        const findUseCase = new InvoiceFindUseCase(repository);
        const invoiceFacade = new InvoiceFacade({generate: generateUseCase, find: findUseCase});
        return invoiceFacade;
    }
}