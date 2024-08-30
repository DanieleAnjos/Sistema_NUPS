const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

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
        allowNull: false,
        defaultValue: {
            cep: '',
            estado: '',
            cidade: '',
            bairro: '',
            pais: ''
        }
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
    historicoMedico: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Paciente'
});

module.exports = Paciente;
