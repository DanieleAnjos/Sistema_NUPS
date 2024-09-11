const { DataTypes } = require('sequelize');
const sequelize = require('./Index'); // Altere para './Index' se a configuração estiver lá

const Ocorrencia = sequelize.define('Ocorrencia', {
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
