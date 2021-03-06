const express = require("express");
const multer = require("multer");
const router = express.Router();

const Cliente = require("../models/cliente");

// heroku -> containers efemetor -> eles vao ser reiniciados mesmo nas versoes pagas

// upload da imagem faz no AWS S3 e armazena a url da imagem no banco

// upload Google Cloud Storage e armazena a url da imagem no banco

// Base64 -> converte a imagem para uma sequencia de caracteres que representa uma imagem


const MIME_TYPE_EXTENSAO_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/bmp': 'bmp',
}

// middleware
const armazenamento = multer.diskStorage({
  destination : (req, file, callback) => {
    let e = MIME_TYPE_EXTENSAO_MAP[file.mimetype] ? null : new Error("Mime type Invalido");
    // null representa a nao existencia de um erro
    callback(e, 'backend/images') // pasta onde vao ficar armazenadas as imagens
  },
  filename: (req, file, callback) => {
    const nome = file.originalname.toLowerCase().split(' ').join('-');
    const extensao = MIME_TYPE_EXTENSAO_MAP[file.mymetype];
    callback(null, `${nome}-${Date.now()}.${extensao}`);
  }
});

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
  console.log(req.params.id);
  Cliente.findById(req.params.id).then((docCliente) => {
    if (docCliente) {
      res.status(200).json(docCliente);
    } else {
      res.status(404).json({ mensagem: "Cliente não encontrado!" });
    }
  });
});

router.post("", multer({Storage: armazenamento}).single('imagem'), (req, res) => {
  const imagemURL = `${req.protocol}://${req.get('host')}`;
  const cliente = new Cliente({
    ...req.body,
    imagemURL: `${imagemURL}/images/${req.file.filename}`
  });
  /* let { nome, fone, email } = req.body;
  clientes.push({ nome, fone, email }); */
  cliente.save().then((clienteInserido) => {
    res.status(201).json({
      message: "Cliente inserido com sucesso",
      // id: clienteInserido._id,
      cliente: {
        id: clienteInserido._id,
        nome: clienteInserido.nome,
        fone: clienteInserido.fone,
        email: clienteInserido.email,
        imagemURL: clienteInserido.imagemURL,
      }
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
