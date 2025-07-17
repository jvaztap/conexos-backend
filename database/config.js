const { Sequelize } = require('sequelize');
require('dotenv').config();



const dbConnection = new Sequelize('postgresql://neondb_owner:npg_jQSJqc0o5YRm@ep-tiny-morning-aejy6ve4-pooler.c-2.us-east-2.aws.neon.tech/conexos?sslmode=require&channel_binding=require')

    
module.exports = {
    dbConnection
}