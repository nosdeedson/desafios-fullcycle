const { Sequelize } = require('sequelize')
const db = require('./db.js')

const People = db.define('people',{
    nome:{
        type: Sequelize.STRING,
        allowNull: true,
        timestamps: false
    }
})

module.exports = People;