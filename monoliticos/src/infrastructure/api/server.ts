import {app} from "./express"
import dotenv from 'dotenv'

dotenv.config()
const port : number = Number(process.env.PORT) || 3000;

app.listen(3000, () =>{
    console.log(`server is listening on port 3000`)
})