// Importa e instancia o cliente Prisma para acessar o banco de dados
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Cria uma nova categoria com base no nome enviado no corpo da requisição
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

// Lista todas as categorias existentes
async function listarCategorias(req, res) {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar categorias' });
  }
}

// Atualiza o nome de uma categoria pelo ID informado na URL
async function atualizarCategoria(req, res) {
    const { id } = req.params;
    const { nome } = req.body;
  
    try {
      const categoriaAtualizada = await prisma.categoria.update({
        where: { id: parseInt(id) }, // Converte o ID para inteiro
        data: { nome }
      });
      res.json(categoriaAtualizada);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar categoria' });
    }
  }
  
  // Remove uma categoria com base no ID informado na URL
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
  
  // Exporta as funções para uso nas rotas
  module.exports = { criarCategoria, listarCategorias, atualizarCategoria, removerCategoria };
