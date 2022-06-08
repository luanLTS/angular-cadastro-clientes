// este arquivo é um modulo js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const Cliente = require("./models/cliente");

const {
  MONGODB_USER,
  MONGODB_PASSWD,
  MONGODB_CLUSTER,
  MONGODB_HOST,
  MONGODB_DB,
} = process.env;

mongoose
  .connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWD}@${MONGODB_CLUSTER}.${MONGODB_HOST}.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("conexao okay");
  })
  .catch((err) => {
    console.log("conexao não okay");
    console.log(err);
  });

app.use(cors());
app.use(express.json());

// funcao middleware, fica no meio do caminho e pega as requisicoes
app.get("/api/clientes", (req, res) => {
  Cliente.find().then((documents) => {
    res.status(200).json({
      message: "OK",
      clientes: documents,
    });
  });
});

app.post("/api/clientes", (req, res) => {
  const cliente = new Cliente({
    ...req.body,
  });
  /* let { nome, fone, email } = req.body;
  clientes.push({ nome, fone, email }); */
  cliente.save().then((clienteInserido) => {
    res.status(201).json({
      message: "Cliente inserido com sucesso",
      id: clienteInserido._id,
    });
  });
});

// :id indica que o nome que vier no lugar do id na requicao sera uma variavel, ficando disponivel,
// automaticamente em req.params
app.delete("/api/clientes/:id", (req, res) => {
  Cliente.deleteOne({ _id: req.params.id })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).end();
});

app.put("/api/clientes/:id", (req, res) => {
  const cliente = new Cliente({
    ...req.body,
    _id: req.params.id,
  });
  Cliente.updateOne({ _id: req.params.id }, cliente).then((result) => {
    console.log(result);
    res.status(200).json({
      mensagem: "Atualizacao realizada com sucesso",
    });
  });
});

// torna o objeto app public para ser utilizado em outras partes do projeto
module.exports = app;
