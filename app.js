const express = require('express');
const multer = require('multer');
const sequelize = require('./config/database');
const Sequelize = require('sequelize');
const path = require('path');


const exphbs = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

const Paciente = sequelize.define('Paciente', {
  nome: {
    type: Sequelize.STRING
  },
  dataNascimento: {
    type: Sequelize.DATE
  },
  endereco: {
    type: Sequelize.STRING
  },
  telefone: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  historicoMedico: {
    type: Sequelize.TEXT
  },
  imagem: {
    type: Sequelize.STRING
  }
});

const Profissional = sequelize.define('Profissional', {
    nome: {
      type: Sequelize.STRING
    },
    especialidade: {
      type: Sequelize.STRING
    },
    endereco: {
      type: Sequelize.STRING
    },
    telefone: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    dataNascimento: {
        type: Sequelize.DATE
    },
    cpf: {
        type: Sequelize.STRING
    },
    contatoEmergencia: {
        type: Sequelize.STRING
    }
  
});


app.get('/', (req, res) => {
  res.send('Funcionando');
});

app.get('/cadastroPaciente', async (req, res) => {
    res.render('cadastroPaciente');
});

app.get('/cadastroProfissionais', async (req, res) => {
    res.render('cadastroProfissionais');
})

app.post('/cadastroPacientes', upload.single('imagem'), async (req, res) => {
  const { nome, dataNascimento, endereco, telefone, email, historicoMedico } = req.body;
  const imagem = req.file ? req.file.filename : null;
  if (!nome || !dataNascimento || !endereco || !telefone || !email || !historicoMedico) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  try {
    const paciente = await Paciente.create({
      nome,
      dataNascimento,
      endereco,
      telefone,
      email,
      historicoMedico,
      imagem
    });
    const pacientes = await Paciente.findAll();
    res.json(pacientes);
  } catch (err) {
    console.error('Erro ao cadastrar paciente: ', err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

app.post('/cadastroProfissionais', upload.single('imagem'), async (req, res) => {
    const { nome, cargo, vinculo, endereco, telefone, email, dataNascimento, cpf, contatoEmergencia } = req.body;
    const imagem = req.file? req.file.filename : null;
    if (!nome ||!cargo || vinculo ||!endereco ||!telefone ||!email ||!dataNascimento ||!cpf ||!contatoEmergencia) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    try {
      const profissional = await Profissional.create({
        nome,
        cargo,
        vinculo,
        dataAdmissao,
        endereco,
        telefone,
        email,
        dataNascimento,
        cpf,
        contatoEmergencia,
        imagem
      });
      const profissionais = await Profissional.findAll();
      res.json(profissionais);

    } catch (err) {
        console.error('Erro ao cadastrar profissional: ', err);
      return res.status(500).json({ error: 'Erro interno no servidor' });
    }
});


sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(3002, () => {
      console.log('Servidor rodando em http://localhost:3002');
    });
  })
  .catch(err => console.log('Erro ao sincronizar o banco de dados', err));