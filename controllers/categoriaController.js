const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarCategoria(req, res) {
  try {
    const { nome } = req.body;
    const novaCategoria = await prisma.categoria.create({
      data: { nome }
    });
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar categoria' });
  }
}

async function listarCategorias(req, res) {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar categorias' });
  }
}

async function atualizarCategoria(req, res) {
    const { id } = req.params;
    const { nome } = req.body;
  
    try {
      const categoriaAtualizada = await prisma.categoria.update({
        where: { id: parseInt(id) },
        data: { nome }
      });
      res.json(categoriaAtualizada);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar categoria' });
    }
  }
  
  async function removerCategoria(req, res) {
    const { id } = req.params;
  
    try {
      await prisma.categoria.delete({
        where: { id: parseInt(id) }
      });
      res.json({ mensagem: 'Categoria removida com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao remover categoria' });
    }
  }
  
  module.exports = { criarCategoria, listarCategorias, atualizarCategoria, removerCategoria };
