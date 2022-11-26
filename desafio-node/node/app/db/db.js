const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');

const dbName = process.env.DB_NAME; // passar os dados do .env para as constantes
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize('node', 'root', 'root', {
    //passar os dados para o sequelize
    dialect: "mysql", //informar o tipo de banco que vamos utilizar
    host: 'mysql', //o host, neste caso estamos com um banco local
    port: 3306
  });

module.exports = sequelize