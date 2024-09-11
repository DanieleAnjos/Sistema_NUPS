const { DataTypes } = require('sequelize');
const sequelize = require('./Index');
const Profissional = require('./Profissional');

const Atendimento = sequelize.define('Atendimento', {
  
  matricula: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nomePaciente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numeroProcesso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  assunto: {
    type: DataTypes.ENUM('Acolhimento de disparo', 'Acolhimento psicossocial', 'Exposição negativa na mídia'),
    allowNull: false
  },
  registroAtendimento: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  acolhidoEm: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  profissionalId: {
    type: DataTypes.INTEGER,
    references: {
      model: Profissional,
      key: 'id'
    },
    allowNull: false
  },
  profissionalAtendimento: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  especialidade: {
    type: DataTypes.ENUM('Assistente Social', 'Psicólogo', 'Psiquiatra'),
    allowNull: false 
  }
}, {
  tableName: 'atendimentos', 
  timestamps: true
});

Atendimento.belongsTo(Profissional, {
  foreignKey: 'profissionalId',
  as: 'profissional'
});

module.exports = Atendimento;
