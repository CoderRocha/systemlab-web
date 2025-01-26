const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// aqui irá criar ou conectar ao banco SQLite
const db = new sqlite3.Database(path.resolve(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco SQLite.');
    }
});

// criação das tabelas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS pacientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            numero_atendimento TEXT UNIQUE,
            nome_completo TEXT NOT NULL,
            sexo TEXT NOT NULL,
            email TEXT NOT NULL,
            celular TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS exames (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo TEXT UNIQUE NOT NULL,
            descricao TEXT NOT NULL,
            valor REAL NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS paciente_exames (
            paciente_id INTEGER,
            exame_id INTEGER,
            FOREIGN KEY(paciente_id) REFERENCES pacientes(id),
            FOREIGN KEY(exame_id) REFERENCES exames(id)
        )
    `);
});

module.exports = db;