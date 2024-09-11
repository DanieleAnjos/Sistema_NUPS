const { DataTypes } = require('sequelize');
const sequelize = require('./Index');

const Profissional = sequelize.define('Profissional', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.JSON, 
    allowNull: false
  },
  contatoEmergencia: {
    type: DataTypes.JSON, 
    allowNull: true
  },
  dataAdmissao: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vinculo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  matricula: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'profissionais',
  timestamps: true
});

module.exports = Profissional;
