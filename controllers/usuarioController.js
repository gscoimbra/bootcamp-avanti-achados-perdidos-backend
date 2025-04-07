// Instancia o cliente do Prisma para interagir com o banco de dados, o bcrypt para criptografar a senha e o jwt como token de autenticação
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Cria um novo usuário com os dados recebidos no corpo da requisição
async function criarUsuario(req, res) {
  try {
    const { nome, telefone, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10); // Criptografa a senha antes de salvar, 10 é o "salt rounds"

    const novoUsuario = await prisma.usuario.create({
      data: { 
        nome,
        telefone,
        email,
        senha: senhaHash
      }
    });
    res.status(201).json({ id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
}

// Retorna todos os usuários cadastrados no sistema
async function listarUsuarios(req, res) {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
}

// Atualiza os dados de um usuário pelo ID informado na URL
async function atualizarUsuario(req, res) {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;
  
    try {
      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: parseInt(id) },
        data: { nome, telefone, email }
      });
      res.json(usuarioAtualizado);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
  }
  
  // Remove um usuário com base no ID informado na URL
  async function removerUsuario(req, res) {
    const { id } = req.params;
  
    try {
      await prisma.usuario.delete({
        where: { id: parseInt(id) }
      });
      res.json({ mensagem: 'Usuário removido com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao remover usuário' });
    }
  }

  async function login(req, res) {
    const { email, senha } = req.body;
  
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { email }
      });
  
      if (!usuario) {
        return res.status(401).json({ erro: 'Usuário não encontrado' });
      }
  
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Senha inválida' });
      }
  
      // Gera o token JWT com o ID do usuário
      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // token expira em 1 dia
      );
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao realizar login' });
    }
  }
  
  // Exporta as funções para serem usadas nas rotas
  module.exports = { criarUsuario, listarUsuarios, atualizarUsuario, removerUsuario, login};
