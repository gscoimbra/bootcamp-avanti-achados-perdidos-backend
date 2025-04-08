// Instancia o cliente do Prisma para interagir com o banco de dados, o bcrypt para criptografar a senha e o jwt como token de autenticação
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuarioService = require('../services/usuarioService');

// Cria um novo usuário com os dados recebidos no corpo da requisição
async function criarUsuario(req, res) {
  try {
    const { nome, telefone, email, senha } = req.body;
    const novoUsuario = await usuarioService.criarUsuario({ nome, telefone, email, senha });

    res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email
    });
  } catch (error) {
    next(error);
  }
}

// Retorna todos os usuários cadastrados no sistema
async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
}

// Atualiza os dados de um usuário pelo ID informado na URL
async function atualizarUsuario(req, res) {
  const { id } = req.params;
  const { nome, telefone, email } = req.body;

  try {
    const usuario = await usuarioService.atualizarUsuario(id, { nome, telefone, email });
    res.json(usuario);
  } catch (error) {
    next(error);
  }
}
  
  // Remove um usuário com base no ID informado na URL
  async function removerUsuario(req, res) {
    const { id } = req.params;
  
    try {
      await usuarioService.removerUsuario(id);
      res.json({ mensagem: 'Usuário removido com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async function login(req, res) {
    const { email, senha } = req.body;
  
    try {
      const usuario = await usuarioService.buscarPorEmail(email);
  
      if (!usuario) {
        throw { status: 404, message: 'Usuário não encontrado' };
      }
  
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        throw { status: 401, message: 'Senha inválida' };
      }
  
      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
  
  // Exporta as funções para serem usadas nas rotas
  module.exports = { criarUsuario, listarUsuarios, atualizarUsuario, removerUsuario, login};
