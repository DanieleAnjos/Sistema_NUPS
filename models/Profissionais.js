const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');

class Profissional extends Model {}

Profissional.init({
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
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contatoEmergencia: {
        type: DataTypes.JSON, // JSON to store both name and phone
        allowNull: true,
        defaultValue: {
            nome: '',
            telefone: ''
        }
    },
    dataAdmissao: {
        type: DataTypes.DATEONLY,
        validate: {
            isDate: true
        }
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Assistente Social', 'Adm', 'Psicólogo', 'Psiquiatra', 'Voluntário', 'Servidor da Guarda']]
        }
    },
    vinculo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Voluntário', 'Servidor']]
        }
    },


    numeroMatricula: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            // Custom validation to ensure numeroMatricula is provided only for "Servidor da Guarda"
            checkMatricula(value) {
                if (this.cargo === 'Servidor da Guarda' && !value) {
                    throw new Error('Número da matrícula é obrigatório para Servidor da Guarda.');
                }
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    imagem: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Profissional'
});

module.exports = Profissional;
