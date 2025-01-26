const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();

// middleman
app.use(cors());
app.use(bodyParser.json());

// Endpoints bem básicos
app.get('/', (req, res) => {
    res.send('API do Sistema está funcionando!');
});

// outros endpoints estarão aqui

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});