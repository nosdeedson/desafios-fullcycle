import { Sequelize } from "sequelize-typescript";
import OrderModel from "../repository/order.model";
import ProductOrder from "../repository/product.order.model";
import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import Id from "../../domain/entity/value-object/id.value-object";
import AddressClientDto from "../../client-adm/domain/value-object/address";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../storage-catalog/factory/facade.factory";
import CheckoutFacadeFactory from "../factory/checkout.facade.factory";
import ClientOrder from "../repository/client.order.model";
import ClientModel from "../../client-adm/repository/client.model";
import ProductModel from "../../product-adm/repository/product.model";
import ProducStorageCatalogtModel from "../../storage-catalog/repository/product.model";
import TransactionModel from "../../payment/repository/transaction.model";
import InvoiceModel from "../../invoice/repository/invoice.model";
import ProductInvoiceModel from "../../invoice/repository/product.model";

describe('client adm facade test unit', () =>{

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ':memory:',
            logging: false,
            sync: {force: true}
        });
        await sequelize.addModels([
            OrderModel, 
            ProductOrder, 
            ClientOrder,
            ProductModel,
            ProducStorageCatalogtModel,
            TransactionModel,
            ClientModel,
            InvoiceModel,
            ProductInvoiceModel
        ]);
        sequelize.connectionManager.initPools();
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should not add an order', async () => {
        const clientUsecase = ClientAdmFacadeFactory.create();
        const input = {
            id: new Id('l1'),
            name: 'lucineia',
            document: 'doc',
            email: 'teste@teste',
            address: new AddressClientDto('street', '1', 'city', 'zipcode', 'state', 'complement')
        }
        await clientUsecase.add(input);
        const client = await clientUsecase.find({id: 'l1'});
        
        const productUsecase = ProductAdmFacadeFactory.create();
        const inputProduct = {
            id: 'p1',
            name: 'product 1',
            description: 'product description',
            purchasePrice: 10,
            stock: 10
        };
        await productUsecase.addProduct(inputProduct);

        const findProductUseCade = StoreCatalogFacadeFactory.create()
        const products = await findProductUseCade.findAll({});

        const useCase = CheckoutFacadeFactory.create();
        const listProduct = products.products.map((p) => {
            return { productId: p.id}
        })
        const result = await useCase.execute({clientId: client.id, products: listProduct});
        expect(result.id).toBeDefined();
        expect(result.invoiceId).toBe(null);
        expect(result.status).toBe('pending')
        expect(result.products.length).toBe(1)
    }, 5000000);

    it('should add an order',async () => {
        const clientUsecase = ClientAdmFacadeFactory.create();
        const input = {
            id: new Id('m1'),
            name: 'maria',
            document: 'doc',
            email: 'teste@teste',
            address: new AddressClientDto('street', '1', 'city', 'zipcode', 'state', 'complement')
        }
        await clientUsecase.add(input);
        const client = await clientUsecase.find({id: 'm1'});
        
        const productUsecase = ProductAdmFacadeFactory.create();
        const inputProduct = {
            id: 'p2',
            name: 'product 2',
            description: 'product description',
            purchasePrice: 100,
            stock: 10
        };
        await productUsecase.addProduct(inputProduct);

        const findProductUseCade = StoreCatalogFacadeFactory.create()
        const products = await findProductUseCade.findAll({});

        const useCase = CheckoutFacadeFactory.create();
        const listProduct = products.products.map((p) => {
            return { productId: p.id}
        })
        const result = await useCase.execute({clientId: client.id, products: listProduct});
        expect(result.id).toBeDefined();
        expect(result.invoiceId).toBeDefined();
        expect(result.status).toBe('approved')
        expect(result.products.length).toBe(1)
    }, 5000000);
});