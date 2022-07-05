const express = require("express");
const router = express.Router();

const Cliente = require("../models/cliente");

// funcao middleware, fica no meio do caminho e pega as requisicoes
router.get("", (req, res) => {
  Cliente.find().then((documents) => {
    res.status(200).json({
      message: "OK",
      clientes: documents,
    });
  });
});

router.get("/:id", (req, res) => {
  Cliente.findById(req.params.id).then((docCliente) => {
    if (docCliente) {
      res.status(200).json(docCliente);
    } else {
      res.status(404).json({ mensagem: "Cliente não encontrado!" });
    }
  });
});

router.post("", (req, res) => {
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
router.delete("/:id", (req, res) => {
  Cliente.deleteOne({ _id: req.params.id })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).end();
});

router.put("/:id", (req, res) => {
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

module.exports = router;
