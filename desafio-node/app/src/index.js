const express = require("express");
const routes= require("./routes.js");
require('dotenv').config()
const People = require('../db/people.js');

const db= require('../db/db.js')

const port = 3000;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, async () =>{
     try {
       const resultado = await db.sync();
          // await db.createSchema('node')
          //   .then(resp => console.log(resp))
          console.log(resultado);
          console.log('Connection has been established successfully.');
        } catch (error) {
          console.error('Unable to connect to the database:', error);
        }
     console.log("Servidor iniciado na porta 3000")}
);

