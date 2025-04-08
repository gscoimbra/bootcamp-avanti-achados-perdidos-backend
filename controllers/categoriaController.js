const categoriaService = require('../services/categoriaService');

// Cria uma nova categoria com base no nome enviado no corpo da requisição
async function criarCategoria(req, res) {
  try {
    const { nome } = req.body;
    const novaCategoria = await categoriaService.criarCategoria({ nome });
    res.status(201).json(novaCategoria);
  } catch (error) {
    next(error);
  }
}

// Lista todas as categorias existentes
async function listarCategorias(req, res) {
  try {
    const categorias = await categoriaService.listarCategorias();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
}

// Atualiza o nome de uma categoria pelo ID informado na URL
async function atualizarCategoria(req, res) {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const categoriaAtualizada = await categoriaService.atualizarCategoria(id, { nome });
    res.json(categoriaAtualizada);
  } catch (error) {
    next(error);
  }
}

// Remove uma categoria com base no ID informado na URL
async function removerCategoria(req, res) {
  const { id } = req.params;

  try {
    await categoriaService.removerCategoria(id);
    res.json({ mensagem: 'Categoria removida com sucesso' });
  } catch (error) {
    next(error);
  }
}

// Exporta as funções para uso nas rotas
module.exports = { criarCategoria, listarCategorias, atualizarCategoria, removerCategoria };
