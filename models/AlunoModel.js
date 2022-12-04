const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alunoSchema = Schema({
    matricula : String,
    nome: String,
    senha : String
})

module.exports = mongoose.model("Aluno", alunoSchema);