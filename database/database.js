require('dotenv').config();
const { Sequelize } = require("sequelize");
const databaseName = process.env.DB_DATABASE;
const hostName = process.env.DB_HOST;
const password = process.env.DB_PASS;

const connection = new Sequelize(databaseName, 'root', password, {
    host: hostName,
    dialect: 'mysql'
});

module.exports = connection;