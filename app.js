const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { engine: handlebarsEngine } = require('express-handlebars');
const session = require('express-session');
const sequelize = require('./models/Index'); 
const Paciente = require('./models/Pacientes');
const Atendimento = require('./models/Atendimento');
const Profissional = require('./models/Profissional');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true
}));

app.engine('handlebars', handlebarsEngine({
  defaultLayout: 'main', 
  layoutsDir: path.join(__dirname, 'views', 'layouts'), 
  partialsDir: path.join(__dirname, 'views', 'partials'), 
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(upload.single('imagem'));


app.get('/', async (req, res) => {
  res.render('/index');
});



app.get('/paciente/novo', async (req, res) => {
  res.render('paciente/novo');
});

app.post('/pacientes', async (req, res) => {
  const { nome, endereco, dataNascimento, cpf, telefone, status, encaminhamento } = req.body;

  try {
    if (!nome || !cpf || !telefone || !status || !encaminhamento) {
      return res.status(400).send('Todos os campos são obrigatórios');
    }

    await Paciente.create({
      nome,
      endereco: JSON.parse(endereco),
      dataNascimento,
      cpf,
      telefone,
      status,
      encaminhamento
    });

    res.redirect('/listaPacientes');
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    res.status(500).send('Erro ao criar paciente');
  }
});

app.put('/paciente/:id', async (req, res) => {
  const { nome, endereco, dataNascimento, cpf, telefone, status, encaminhamento } = req.body;
  const { id } = req.params;

  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).send('Paciente não encontrado');
    }

    await Paciente.update({
      nome,
      endereco: JSON.parse(endereco),
      dataNascimento,
      cpf,
      telefone,
      status,
      encaminhamento
    }, { where: { id } });

    res.redirect('/listaPacientes');
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    res.status(500).send('Erro ao atualizar paciente');
  }
});

app.delete('/paciente/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).send('Paciente não encontrado');
    }

    await Paciente.destroy({ where: { id } });
    res.redirect('/listaPacientes');
  } catch (error) {
    console.error('Erro ao remover paciente:', error);
    res.status(500).send('Erro ao remover paciente');
  }
});

app.get('/atendimento/novo', async (req, res) => {
  try {
    const profissionais = await Profissional.findAll(); 
    res.render('atendimento/novo', { profissionais });
  } catch (error) {
    console.error('Erro ao carregar formulário de atendimento:', error);
    res.status(500).send('Erro ao carregar o formulário de atendimento');
  }
});

app.get('/atendimento/lista', async (req, res) => {
  const atendimento = await Atendimento.findAll(); // Consulta todos os atendimentos no banco de dados
  res.render('atendimento/lista', { atendimento });
});

app.post('/atendimento', async (req, res) => {
  const { matricula, nomePaciente, numeroProcesso, assunto, registroAtendimento, acolhidoEm, profissionalId } = req.body;

  try {
    const profissional = await Profissional.findByPk(profissionalId);
    if (!profissional) {
      return res.status(404).send('Profissional não encontrado');
    }

    await Atendimento.create({
      matricula,
      nomePaciente,
      numeroProcesso,
      assunto,
      registroAtendimento,
      acolhidoEm,
      profissionalId,
      profissionalAtendimento: profissional.nome,
      especialidade: profissional.cargo
    });

    res.redirect('/atendimento/lista');
  } catch (error) {
    console.error('Erro ao criar atendimento:', error);
    res.status(500).send('Erro ao criar atendimento');
  }
});

app.put('/atendimento/:id', async (req, res) => {
  const { id } = req.params;
  const { matricula, nomePaciente, numeroProcesso, assunto, registroAtendimento, acolhidoEm, profissionalId } = req.body;

  try {
    const atendimento = await Atendimento.findByPk(id);
    if (!atendimento) {
      return res.status(404).send('Atendimento não encontrado');
    }

    const profissional = await Profissional.findByPk(profissionalId);
    if (!profissional) {
      return res.status(404).send('Profissional não encontrado');
    }

    await atendimento.update({
      matricula,
      nomePaciente,
      numeroProcesso,
      assunto,
      registroAtendimento,
      acolhidoEm,
      profissionalId,
      profissionalAtendimento: profissional.nome,
      especialidade: profissional.cargo
    });

    res.redirect('/atendimento/lista');
  } catch (error) {
    console.error('Erro ao editar atendimento:', error);
    res.status(500).send('Erro ao editar atendimento');
  }
});

app.delete('/atendimento/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Atendimento.destroy({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar atendimento:', error);
    res.status(500).json({ success: false });
  }
});



app.get('/profissionais/novo', (req, res) => {
  res.render('profissionais/novo');
});


app.post('/profissionais', async (req, res) => {
  const {
    nome,
    dataNascimento,
    cpf,
    telefone,
    cep,
    estado,
    cidade,
    bairro,
    contatoEmergenciaNome,
    contatoEmergenciaTelefone,
    dataAdmissao,
    cargo,
    vinculo,
    numeroMatricula,
    email
  } = req.body;

  try {
    if (!nome || !dataNascimento || !cpf || !telefone || !cep || !estado || !cidade || !bairro || !dataAdmissao || !cargo || !vinculo || !email) {
      return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos');
    }

    const endereco = {
      cep,
      estado,
      cidade,
      bairro
    };

    const contatoEmergencia = {
      nome: contatoEmergenciaNome,
      telefone: contatoEmergenciaTelefone
    };

    await Profissional.create({
      nome,
      dataNascimento,
      cpf,
      telefone,
      endereco: endereco, 
      contatoEmergencia: contatoEmergencia, 
      dataAdmissao,
      cargo,
      vinculo,
      matricula: numeroMatricula,
      email
    });

    res.redirect('/listaProfissionais');
  } catch (error) {
    console.error('Erro ao criar profissional:', error);
    res.status(500).send('Erro ao criar profissional');
  }
});



app.get('/profissionais/:id/editar', async (req, res) => {
  try {
    const profissional = await Profissional.findByPk(req.params.id);
    if (!profissional) {
      return res.status(404).send('Profissional não encontrado');
    }
    res.render('profissionais/editar', { profissional });
  } catch (error) {
    console.error('Erro ao buscar profissional:', error);
    res.status(500).send('Erro ao buscar profissional');
  }
});

app.put('/profissionais/:id', async (req, res) => {
  const { nome, endereco, dataNascimento, cpf, telefone, contatoEmergencia, matricula, dataAdmissao, cargo, vinculo, numeroMatricula, email, imagem } = req.body;
  const { id } = req.params;

  try {
    const profissional = await Profissional.findByPk(id);
    if (!profissional) {
      return res.status(404).send('Profissional não encontrado');
    }

    await Profissional.update({
      nome,
      endereco,
      dataNascimento,
      cpf,
      telefone,
      contatoEmergencia,
      dataAdmissao,
      cargo,
      vinculo,
      numeroMatricula,
      email,
      imagem
    }, { where: { id } });

    res.redirect('/profissionais');
  } catch (error) {
    console.error('Erro ao atualizar profissional:', error);
    res.status(500).send('Erro ao atualizar profissional');
  }
});

app.delete('/profissionais/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const profissional = await Profissional.findByPk(id);
    if (!profissional) {
      return res.status(404).send('Profissional não encontrado');
    }

    await Profissional.destroy({ where: { id } });
    res.redirect('/profissionais');
  } catch (error) {
    console.error('Erro ao remover profissional:', error);
    res.status(500).send('Erro ao remover profissional');
  }
});

app.get('/evento/novo', (req, res) => {
  res.render('evento/novo');
});





app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: http://localhost:${PORT}`);
});
