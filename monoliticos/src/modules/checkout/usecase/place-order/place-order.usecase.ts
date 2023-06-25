import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import Id from "../../../domain/entity/value-object/id.value-object";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice-facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/payment-facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import { StoreCatalogFacadeInterface } from "../../../storage-catalog/facade/store-catalog.facade.inteface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";
import AddressDto from "../../domain/value-object/address.dto";

export default class PlaceOrderUseCase implements UseCaseInterface{
    
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogFacadeInterface;
    private _checkoutRepository: CheckoutGateway;
    private _invoiceFacade: InvoiceFacadeInterface;
    private _paymentFacade: PaymentFacadeInterface;


    constructor(clientFacade: ClientAdmFacadeInterface,
        productFacade: ProductAdmFacadeInterface,
        catalogFacade: StoreCatalogFacadeInterface,
        checkoutRepocitory: CheckoutGateway,
        invoiceFacade: InvoiceFacadeInterface,
        paymentFacade: PaymentFacadeInterface){
        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
        this._catalogFacade = catalogFacade;
        this._checkoutRepository= checkoutRepocitory;
        this._invoiceFacade = invoiceFacade;
        this._paymentFacade = paymentFacade;

    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {

        const client = await this._clientFacade.find({id: input.clientId})
        if(!client){
            throw new Error('client not found')
        }

        await this.validateProducts(input);

        const products = await Promise.all(
            input.products.map((p) => this.getProduct(p.productId))
        );

        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            document: client.document,
            address: new AddressDto(client.city, client.complement, client.number, client.state, client.street, client.zipCode),
        })

        const order = new Order({client: myClient, products: products})

        const payment = await this._paymentFacade.process({orderId: order.id.id, amount: order.total})

        const invoice = payment.status === 'approved' ?
            await this._invoiceFacade.generate({
                name: client.name,
                document: '123',
                city: client.city,
                complement: client.complement,
                number: client.number,
                items: products.map((p) => { return {id: p.id.id, name: p.name, price: p.salesPrice}}),
                state: client.state,
                street: client.street,
                zipCode: client.zipCode
            }) : null;

            payment.status === 'approved' && order.approve();
            this._checkoutRepository.addOrder(order);

        return {
            id: order.id.id,
            invoiceId: payment.status === 'approved' && order.approved() ? invoice.id : null,
            status: order.status, 
            total: order.total,
            products: order.products.map((p) => { return {productId: p.id.id}})
        }
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void>{
        if(input.products.length === 0 ){
            throw new Error('no product selected')
        }

        for(const p of input.products){
            const product = await this._productFacade.checkStock({productId: p.productId});
            if( product.stock <= 0){
                throw new Error('no stock available')
            }
        }
    }

    private async getProduct(productId: string): Promise<Product>{
        const product = await this._catalogFacade.find({id: productId});
        if(!product){
            throw new Error('product not found')
        }
        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        })
    }
    
}