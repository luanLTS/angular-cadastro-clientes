// este arquivo é um modulo js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// rotas

const routerClientes = require("./routes/clientes");

const {
  MONGODB_USER,
  MONGODB_PASSWD,
  MONGODB_CLUSTER,
  MONGODB_HOST,
  MONGODB_DATABASE,
} = process.env;

mongoose
  .connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWD}@${MONGODB_CLUSTER}.${MONGODB_HOST}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`
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

// usando as rotas de clientes no servidor do express
app.use("/api/clientes", routerClientes);
// torna o objeto app public para ser utilizado em outras partes do projeto
module.exports = app;
