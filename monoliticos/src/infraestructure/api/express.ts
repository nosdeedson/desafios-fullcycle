import express, {Express} from 'express'
import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../../modules/product-adm/repository/product.model';
import { productRoute,} from './routes/products.route';
import { clienttRoute } from './routes/clients.route';
import ClientModel from '../../modules/client-adm/repository/client.model';
import { checkoutRoute } from './routes/checkout.route';
import ProducStorageCatalogtModel from '../../modules/storage-catalog/repository/product.model';
import TransactionModel from '../../modules/payment/repository/transaction.model';
import OrderModel from '../../modules/checkout/repository/order.model';
import ClientOrder from '../../modules/checkout/repository/client.order.model';
import ProductOrder from '../../modules/checkout/repository/product.order.model';
import InvoiceModel from '../../modules/invoice/repository/invoice.model';


export const app: Express = express();
app.use(express.json());
app.use('/products', productRoute);
app.use('/clients', clienttRoute)
app.use('/checkout', checkoutRoute)

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([
    ProductModel, 
    ClientModel, 
    ProducStorageCatalogtModel, 
    TransactionModel,
    OrderModel,
    ClientOrder,
    ProductOrder,
    InvoiceModel]);
  await sequelize.sync();
}
setupDb();
