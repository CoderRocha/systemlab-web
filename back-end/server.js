const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/database');

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// endpoint de teste
app.get('/', (req, res) => {
    res.send('API do Sistema está funcionando!');
});

// endpoint para cadastrar um atendimento
app.post('/atendimentos', (req, res) => {
    const { numeroAtendimento, nomePaciente, sexo, email, celular, exames } = req.body;

    const sqlAtendimento = `
        INSERT INTO atendimentos (numero_atendimento, nome_completo, sexo, email, celular)
        VALUES (?, ?, ?, ?, ?)
    `;
    const paramsAtendimento = [numeroAtendimento, nomePaciente, sexo, email, celular];

    db.run(sqlAtendimento, paramsAtendimento, function (err) {
        if (err) {
            console.error('Erro ao salvar atendimento:', err.message);
            return res.status(500).json({ message: 'Erro ao salvar atendimento.' });
        }

        const atendimentoId = this.lastID;

        // inserir os exames associados ao atendimento (se houver)
        if (exames && exames.length > 0) {
            const sqlExames = `
                INSERT INTO paciente_exames (paciente_id, exame_id)
                SELECT ?, id FROM exames WHERE codigo = ?
            `;

            const examesPromises = exames.map((codigoExame) => {
                return new Promise((resolve, reject) => {
                    db.run(sqlExames, [atendimentoId, codigoExame], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            });

            Promise.all(examesPromises)
                .then(() => res.status(201).json({ message: 'Atendimento salvo com sucesso!' }))
                .catch((error) => {
                    console.error('Erro ao salvar exames:', error.message);
                    res.status(500).json({ message: 'Erro ao salvar exames do atendimento.' });
                });
        } else {
            res.status(201).json({ message: 'Atendimento salvo com sucesso!' });
        }
    });
});

// endpoint para listar todos os atendimentos cadastrados
app.get('/atendimentos', (req, res) => {
  const sql = `
      SELECT 
          a.id AS numero_atendimento, 
          a.nome_completo AS nomePaciente, 
          a.sexo, 
          a.email, 
          a.celular, 
          IFNULL(GROUP_CONCAT(e.descricao), '') AS exames
      FROM atendimentos a
      LEFT JOIN paciente_exames pe ON a.id = pe.paciente_id
      LEFT JOIN exames e ON pe.exame_id = e.id
      GROUP BY a.id
  `;

  db.all(sql, [], (err, rows) => {
      if (err) {
          console.error('Erro ao buscar atendimentos:', err.message);
          return res.status(500).json({ message: 'Erro ao buscar atendimentos.' });
      }

      res.status(200).json(rows);
  });
});

// endpoint para cadastrar um exame
app.post('/exames', (req, res) => {
    const { codigo, descricao, valor } = req.body;

    const sql = `
        INSERT INTO exames (codigo, descricao, valor)
        VALUES (?, ?, ?)
    `;
    const params = [codigo, descricao, valor];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Erro ao salvar exame:', err.message);
            return res.status(500).json({ message: 'Erro ao salvar exame.' });
        }

        res.status(201).json({ message: 'Exame cadastrado com sucesso!', exameId: this.lastID });
    });
});

// endpoint para listar todos os exames cadastrados
app.get('/exames', (req, res) => {
    const sql = `SELECT codigo, descricao, valor FROM exames`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar exames:', err.message);
            return res.status(500).json({ message: 'Erro ao buscar exames.' });
        }

        res.status(200).json(rows);
    });
});

// endpoint para gerar o relatório de pacientes por data
app.get('/relatorios', (req, res) => {
  const sql = `
    SELECT 
      a.data_cadastro, 
      a.numero_atendimento AS codigo_paciente, 
      a.nome_completo, 
      a.sexo, 
      a.email, 
      a.celular, 
      IFNULL(GROUP_CONCAT(e.descricao), 'Nenhum') AS exames
    FROM atendimentos a
    LEFT JOIN paciente_exames pe ON a.id = pe.paciente_id
    LEFT JOIN exames e ON pe.exame_id = e.id
    GROUP BY a.id
    ORDER BY a.data_cadastro DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Erro ao buscar relatórios:', err.message);
      return res.status(500).json({ message: 'Erro ao buscar relatórios.' });
    }

    res.status(200).json(rows);
  });
});

// config  do servidor local
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});