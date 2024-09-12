const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Ocorrencia extends Model {}

Ocorrencia.init({

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: DataTypes.DATE, 
    autoIncrement: true,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  relatorio: {
    type: DataTypes.TEXT,
    allowNull: false 
  },
  horaChegada: {
    type: DataTypes.TIME,
    allowNull: true
  },
  horaSaida: {
    type: DataTypes.TIME, 
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Ocorrencia',
  tableName: 'ocorrencias_diarias',
  timestamps: true
});

module.exports = Ocorrencia;
