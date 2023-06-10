import InvoiceEntity from "../domain/invoice.entity";

export interface InvoiceGateway{
    generate(input: InvoiceEntity): Promise<InvoiceEntity>;
    find(input: string): Promise<InvoiceEntity>;
}