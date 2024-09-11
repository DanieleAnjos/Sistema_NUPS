const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

class Estoque extends Model {}

Estoque.init({

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dataAquisicao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  dataVencimento: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Estoque',
  tableName: 'estoques',
  timestamps: true
});
    
    module.exports = Estoque;
    