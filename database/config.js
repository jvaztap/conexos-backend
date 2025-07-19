const { Sequelize } = require('sequelize');
require('dotenv').config();



const dbConnection = new Sequelize('sqlitecloud://ciiz0la8hz.g3.sqlite.cloud:8860/conexos?apikey=qE9ajcVa8OrmjpMiuBkNUKkmNM9IYI08R3ZrjURlLuw')

    
module.exports = {
    dbConnection
}