const express = require('express')
const app = express()

const port = 3000;

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//     host: "mysql",
//     user: "root",
//     database: 'node',
//     port: '3307',
//     password: 'root'
// })

// connection.connect()

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:root@localhost:5432/node')
db.query('create table if not exists people(nome varchar(100))')

app.get('/', async (req, res) => {
    let teste = ""
    let pessoas = 0;
    await db.query(`insert into people (nome) values('edson ' )`);
    await db.query('select count(nome) as qtd from people').then( (data) => {
        pessoas = data[0].qtd;
    } )
    db.query("select * from people")
        .then((data) => {
            data.forEach((element, index) => {
                teste += '<div>' + element.nome + ' ' + (index+1) + '</div>'
            });
            res.send(`<h1>Full Cycle Rocks!</h1> <br> <div>${teste}</div> <br> <div> total pessoas: ${pessoas} </div>`)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
})

app.listen(port, () => {
    console.log(`listen: ${port}`)
})