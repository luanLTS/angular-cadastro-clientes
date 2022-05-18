// este arquivo é um modulo js

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const clientes = [
  {
    id: "1",
    nome: "Joao",
    fone: "123456789",
    email: "joao@cliente.com",
  },
  {
    id: "2",
    nome: "maria",
    fone: "123456789",
    email: "maria@cliente.com",
  },
];

// funcao middleware, fica no meio do caminho e pega as requisicoes
app.get("/api/clientes", (req, res) => {
  res.status(200).json({
    message: "OK",
    clientes: clientes,
  });
});

app.post("/api/clientes", (req, res) => {
  console.log(req.body);
  res.status(201).json({message: 'Cliente inserido com sucesso'});
});

// torna o objeto app public para ser utilizado em outras partes do projeto
module.exports = app;
