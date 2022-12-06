const express = require('express');
const routes = express.Router();
const db = require('../db/db')
const People = require('../db/people')

routes.get("/", async (req, res) => {
  let pessoas;
  let resposta = '';
  await db.sync();
  await People.create({
    nome: "edson jose"
  }).then(() => console.log('criou table'))
  await db.query('select count(nome) as pessoas from people')
    .then(async (result) => {
      pessoas = result[0][0].pessoas;
      await db.query('select * from people')
        .then(resp => {
          resp[0].forEach((element, index) => {
            resposta += `<div> ${element.nome}  ${index + 1} </div><br>`
          }); 
          if(pessoas === 0){
            return res.send(`<h1>Full Cycle Rocks!</h1> <br> 
            <div> Aperte F5 para inserir uma pessoa no bando de dados.</div>`);
          } else{
            return res.send(`<h1>Full Cycle Rocks!</h1> <br> <div>${resposta}</div>
                <br> <div> Total pessoas no banco: ${pessoas}  </div>`);
          }
        })
    });
});

module.exports = routes;