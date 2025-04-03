const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

async function listarUsuarios(req, res) {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar usuários' });
  }
}

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
  
  module.exports = { criarUsuario, listarUsuarios, atualizarUsuario, removerUsuario};
