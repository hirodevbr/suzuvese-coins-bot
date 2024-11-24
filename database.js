const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.json');

// Carrega o banco de dados do arquivo JSON
function loadDatabase() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({}));
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
}

// Salva o banco de dados no arquivo JSON
function saveDatabase(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Obtém o saldo de um usuário
function getSaldo(userId) {
    const db = loadDatabase();
    return db[userId] || 0;
}

// Atualiza o saldo de um usuário
function setSaldo(userId, saldo) {
    const db = loadDatabase();
    db[userId] = saldo;
    saveDatabase(db);
}

module.exports = { getSaldo, setSaldo };
