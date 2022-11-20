const express = require('express');

const routes = express.Router();
const db= require('../db/db.js')
const People = require('../db/people.js')

routes.get("/", async (req, res) => {
  let pessoas;
  let resposta = '';
  People.create({
    nome: "edson jose"
  })
  await db.query('select count(nome) as pessoas from people')
  .then((result) => {
    pessoas = result[0][0].pessoas;
  } );
  await db.query('select * from people')
    .then(resp =>{
      resp[0].forEach((element, index) => {
        resposta += `<div> ${element.nome}  ${index + 1} </div><br>` 
      });
    })
  return  res.send(`<h1>Full Cycle Rocks!</h1> <br> <div>${resposta}</div> <br> <div> total pessoas: ${pessoas} </div>`);
  // await db.query('select * from people')
  //   .then((result => console.log(result)));
});

module.exports = routes;