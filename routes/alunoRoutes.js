const express = require("express");
const routes = express.Router();

const auth = require("../middlewares/usuarioAuth");
const alunoController = require("../controllers/alunoController");

routes.get("/aluno", auth, alunoController.listar);

routes.get("/aluno/relatorio", auth, alunoController.relatorio);

routes.post("/aluno", auth, alunoController.cadastrarPost);

routes.get("/aluno/cadastrar/:matricula?", auth, alunoController.cadastrarGet);

routes.get("/aluno/:matricula", auth, alunoController.detalhar);

routes.get("/aluno/remover/:matricula", auth, alunoController.remover);

module.exports = routes;