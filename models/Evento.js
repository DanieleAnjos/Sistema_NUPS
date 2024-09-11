const { DataTypes } = require('sequelize');
const sequelize = require('./Index'); // Altere para './Index' se a configuração estiver lá

const Atendimento = sequelize.define('Atendimento', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dataInicio: {
    type: DataTypes.DATE, 
    allowNull: false
  },
  dataFim: {
    type: DataTypes.DATE, 
    allowNull: false
  },
  diaTodo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  repeticao: {
    type: DataTypes.STRING,
    allowNull: true
  },
  organizadores: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  imagens: {
    type: DataTypes.JSON,
    allowNull: true
  },
  tipoEvento: {
    type: DataTypes.ENUM('Local', 'On-line'),
    allowNull: false
  },
  links: {
    type: DataTypes.STRING,
  },
  privacidade: {
    type: DataTypes.ENUM('PublicoServidores', 'PublicoGeral', 'AcessoLimitado'),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Evento',
  tableName: 'eventos',
  timestamps: true
});

module.exports = Evento;
