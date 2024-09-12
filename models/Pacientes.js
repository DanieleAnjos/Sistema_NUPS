const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Paciente extends Model {}

Paciente.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.JSON, 
        allowNull: false
      },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    dataNascimento: {
        type: DataTypes.DATEONLY,
        validate: {
            isDate: true
        }
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    historicoMedico: {
        type: DataTypes.TEXT,
        allowNull: true 
    },
    status: {
        type: DataTypes.ENUM('Em Atendimento', 'Abandono de Tratamento', 'Alta'),
        allowNull: false
    },
    encaminhamento: {
        type: DataTypes.ENUM('Psicologia', 'Serviço Social'),
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes', 
    timestamps: true 
});

module.exports = Paciente;
