const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carregar variáveis de ambiente

const sequelize = new Sequelize(
  process.env.DB_NAME || 'NUP_DB_HOST',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'cimatec',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql', // ou 'postgres', 'sqlite', etc.
  }
);

module.exports = sequelize;

