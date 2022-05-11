// este arquivo é um modulo js

const express = require("express");
const { rmdirSync } = require("fs");
const app = express();

const clientes = [
  {
    id: '1',
    nome: "Joao",
    fone: '123456789',
    email: 'joao@cliente.com'
  },
  {
    id: '2',
    nome: "maria",
    fone: '123456789',
    email: 'maria@cliente.com'
  }
]

// funcao middleware, fica no meio do caminho e pega as requisicoes
app.use('/api/clientes', (req, res) => {
  res.status(200).json({
    message: 'OK',
    clientes: clientes
  });
});

// torna o objeto app public para ser utilizado em outras partes do projeto
module.exports = app;
