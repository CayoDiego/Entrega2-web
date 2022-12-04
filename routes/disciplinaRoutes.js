const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");
const disciplinaController = require("../controllers/disciplinaController");

routes.get("/disciplina", auth, disciplinaController.listar);

routes.get("/disciplina/relatorio", auth, disciplinaController.relatorio);

routes.post("/disciplina", auth, disciplinaController.cadastrarPost);

routes.get("/disciplina/cadastrar/:disciplina?", auth, disciplinaController.cadastrarGet);

routes.get("/disciplina/:disciplina", auth, disciplinaController.detalhar);

routes.get("/disciplina/remover/:disciplina", auth, disciplinaController.remover);

module.exports = routes;