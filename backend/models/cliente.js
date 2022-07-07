const mongoose = require("mongoose");

// semenlhante ao create table

const clienteSchema = mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  fone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  imagemURL: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Cliente", clienteSchema);
