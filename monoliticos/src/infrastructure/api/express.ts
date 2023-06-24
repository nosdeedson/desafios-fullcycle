import express, {Express} from 'express'
import { homeRoute } from './routes/home.route';


export const app: Express = express();
app.use(express.json());
app.use('/', homeRoute)
