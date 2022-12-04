
const UsuarioModel = require("../models/UsuarioModel");
const bcrypt = require ("bcryptjs");

class UsuarioController{

    static async relatorio(req, res){
        const listaUsuarios = await UsuarioModel.find();
        res.render("usuario/relatorio", {listaUsuarios});
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
        const listaUsuarios = await UsuarioModel.find();
        res.render("usuario/listar", {listaUsuarios, mensagem, cor});
    };

    static async cadastrarGet(req, res){
        const email = req.params.email;
        const erro = req.query.e;
        let usuario = {};
        let escondido = "";
        if (email){
            usuario = await UsuarioModel.findOne({email: email});
            escondido = "hidden";
        }
        res.render("usuario/cadastrar", {usuario, escondido, erro});
    };

    static async cadastrarPost(req, res){
        const usuario = req.body;
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(usuario.senha, salt);
        if (usuario.id){
            await UsuarioModel.findOneAndUpdate({email: usuario.email},
            {
                nome: usuario.nome,
                senha: hash
            });
            res.redirect("/usuario?s=3");

        } else{
            const email = await UsuarioModel.findOne({email: usuario.email});
            if(email){
                res.redirect("/usuario/cadastrar?e=1")
            } else{
                const novoUsuario = new UsuarioModel({
                    email: usuario.email,
                    nome: usuario.nome,
                    senha: hash
                })
                await novoUsuario.save();
                res.redirect("/usuario?s=1");
            }
        }

    };

    static async detalhar(req, res){
        const email = req.params.email;
        const resultado = await UsuarioModel.findOne({email: email});
        res.render("usuario/detalhar", {resultado});
    };

    static async remover(req, res){
        const email = req.params.email;
        await UsuarioModel.findOneAndDelete({email: email});
        res.redirect("/usuario?s=2");
    };

    static async loginGet(req, res){
        if(req.session.usuario){
            res.redirect("/");
        }else{
            const erro = req.query.e;
            res.render("usuario/login", {erro});
        }
    };

    static async loginPost(req, res){
        const usuario = req.body;
        const resultado = await UsuarioModel.findOne({email: usuario.email});
        if (resultado){
            if (bcrypt.compareSync(usuario.senha, resultado.senha)){
                req.session.usuario = resultado.email;
                res.redirect("/");
            } else{
                res.send("Senha ou e-mail incorretos! Tente novamente.");
            }
        }else{
            res.send("Senha ou e-mail incorretos! Tente novamente.");
            console.log(usuario.senha);
        }
    }

    static async logout(req, res){
        req.session.usuario = undefined;
        res.redirect("/");
    }

}

module.exports = UsuarioController;