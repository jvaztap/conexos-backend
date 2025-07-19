const { Sequelize } = require('sequelize');
require('dotenv').config();



const dbConnection = new Sequelize('if0_39508837_conexos', 'if0_39508837', 'JEi8pZq7', {
  host: 'sql201.infinityfree.com',
  dialect: 'mysql'
});

    
module.exports = {
    dbConnection
}