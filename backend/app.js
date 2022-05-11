// este arquivo é um modulo js

const express = require("express");
const app = express();

// funcao middleware, fica no meio do caminho e pega as requisicoes
app.use((req, res, next) => {
  console.log("chegou uma requisicao");
  next();
});

app.use((req, res) => {
  res.send("Hello from the Back End now with Express");
})

// torna o objeto app public para ser utilizado em outras partes do projeto
module.exports = app;
