// Instancia o cliente do Prisma para interagir com o banco de dados
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Cria um novo usuário com os dados recebidos no corpo da requisição
async function criarUsuario(req, res) {
  try {
    const { nome, telefone, email } = req.body;
    const novoUsuario = await prisma.usuario.create({
      data: { nome, telefone, email }
    });
    res.status(201).json(novoUsuario);
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
  
  // Exporta as funções para serem usadas nas rotas
  module.exports = { criarUsuario, listarUsuarios, atualizarUsuario, removerUsuario};
