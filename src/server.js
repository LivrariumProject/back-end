// Importa o Express
const express = require('express');

// Cria uma instância do app
const app = express();

// Define a porta do servidor
const PORT = 3000;

// Servir o HTML index.html
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
