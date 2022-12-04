
const DisciplinaModel = require("../models/DisciplinaModel");

class DisciplinaController{

    static async relatorio(req, res){
        const listaDisciplinas = await DisciplinaModel.find();
        res.render("disciplina/relatorio", {listaDisciplinas});
    }

    static async listar(req, res){
        const s = req.query.s;
        let mensagem;
        let cor;
        if (s == "1"){
            mensagem = "Cadastrado com sucesso!"
            cor = "Green";
        } else if (s == "2"){
            mensagem = "Removido com sucesso!"
            cor = "Red";
        } else if (s == "3"){
            mensagem = "Alterado com sucesso!"
            cor = "Green";
        }
        const listaDisciplinas = await DisciplinaModel.find();
        res.render("disciplina/listar", {listaDisciplinas, mensagem, cor});
    };

    static async cadastrarGet(req, res){
        const dis = req.params.disciplina;
        let disciplina = {};
        let escondido = "";
        if (dis){
            disciplina = await DisciplinaModel.findOne({disciplina: dis});
            escondido = "hidden";
        }
        res.render("disciplina/cadastrar", {disciplina, escondido});
    };

    static async cadastrarPost(req, res){
        const disciplina = req.body;
        if (disciplina.id){
            await DisciplinaModel.findOneAndUpdate({disciplina: disciplina.disciplina},
            {
                nome: disciplina.nome,
                senha: disciplina.senha
            });
            res.redirect("/disciplina?s=3");

        } else{
            const novaDisciplina = new DisciplinaModel({
                disciplina: disciplina.disciplina,
                nome: disciplina.nome,
                senha: disciplina.senha
            })
            await novaDisciplina.save();
            res.redirect("/disciplina?s=1");
        }

    };

    static async detalhar(req, res){
        const dis = req.params.disciplina;
        const resultado = await DisciplinaModel.findOne({disciplina: dis});
        res.render("disciplina/detalhar", {resultado});
    };

    static async remover(req,res){
        const dis = req.params.disciplina;
        await DisciplinaModel.findOneAndDelete({disciplina: dis});
        res.redirect("/disciplina?s=2");
    };

}

module.exports = DisciplinaController;