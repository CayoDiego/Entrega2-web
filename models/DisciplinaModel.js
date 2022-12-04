const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const disciplinaSchema = Schema({
    disciplina : String,
    nome: String,
    senha : String
})

module.exports = mongoose.model("Disciplina", disciplinaSchema);