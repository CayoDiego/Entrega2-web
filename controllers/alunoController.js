
const AlunoModel = require("../models/AlunoModel");
const bcrypt = require ("bcryptjs");

class AlunoController{

    static async relatorio(req, res){
        const listaAlunos = await AlunoModel.find();
        res.render("aluno/relatorio", {listaAlunos});
    }

    static async listar(req, res){
        const s = req.query.s;
        let mensagem;
        let cor;
        if (s == "1"){
            mensagem = "Cadastrado com sucesso!"
            cor = "green";
        } else if (s == "2"){
            mensagem = "Removido com sucesso!"
            cor = "Red";
        } else if (s == "3"){
            mensagem = "Alterado com sucesso!"
            cor = "Green";
        }
        const listaAlunos = await AlunoModel.find();
        res.render("aluno/listar", {listaAlunos, mensagem, cor});
    };

    static async cadastrarGet(req, res){
        const matricula = req.params.matricula;
        const erro = req.query.e;
        let aluno = {};
        let escondido = "";
        if (matricula){
            aluno = await AlunoModel.findOne({matricula: matricula});
            escondido = "hidden";
        }
        res.render("aluno/cadastrar", {aluno, escondido, erro});
    };

    static async cadastrarPost(req, res){
        const aluno = req.body;
        if (aluno.id){
            await AlunoModel.findOneAndUpdate({matricula: aluno.matricula},
            {
                nome: aluno.nome,
                senha: aluno.senha
            });
            res.redirect("/aluno?s=3");

        } else{
            const novoAluno = new AlunoModel({
                matricula: aluno.matricula,
                nome: aluno.nome,
                senha: aluno.senha
            })
            await novoAluno.save();
            res.redirect("/aluno?s=1");
        }

    };

    static async detalhar(req, res){
        const matric = req.params.matricula;
        const resultado = await AlunoModel.findOne({matricula: matric});
        res.render("aluno/detalhar", {resultado});
    };

    static async remover(req, res){
        const matric = req.params.matricula;
        await AlunoModel.findOneAndDelete({matricula: matric});
        res.redirect("/aluno?s=2");
    };

}

module.exports = AlunoController;