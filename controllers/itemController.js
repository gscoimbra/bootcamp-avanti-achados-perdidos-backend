const itemService = require('../services/itemService');

// Cria um novo item com dados do corpo da requisição e imagem (se enviada)
async function criarItem(req, res) {
  try {
    const {
      nome, data, localizacao, contato, status, categoriaId
    } = req.body;

    // Se o arquivo for enviado, salva o nome do arquivo
    const foto = req.file ? req.file.filename : null;

    const novoItem = await itemService.criarItem({
      nome,
      data: new Date(data),
      localizacao,
      contato,
      foto,
      status,
      usuarioId: req.usuario.id, // pega do token, mas precisa ser int, ver depois isso
      categoriaId: parseInt(categoriaId)
    });

    res.status(201).json(novoItem);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// Lista todos os itens com filtros opcionais por status, categoria, localização ou nome
async function listarItens(req, res) {
  try {
    const itens = await itemService.listarItens(req.query);
    res.json(itens);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// Atualiza os dados de um item existente pelo ID, inclusive a imagem (se enviada)
async function atualizarItem(req, res) {
  const { id } = req.params;
  const {
    nome, data, localizacao, contato, status, categoriaId
  } = req.body;

  try {
    const item = await itemService.buscarPorId(id);

    if (!item || item.usuarioId !== req.usuario.id) {
      throw {status: 403, message: 'Acesso negado: item não pertence ao usuário' };
    }

    const foto = req.file ? req.file.filename : undefined;

    const itemAtualizado = await itemService.atualizarItem(id, {
      nome,
      data: new Date(data),
      localizacao,
      contato,
      foto,
      status,
      usuarioId: req.usuario.id,
      categoriaId: parseInt(categoriaId)
    });

    res.json(itemAtualizado);
  } catch (error) {
    console.error('[ERRO AO ATUALIZAR ITEM]', error);
    next(error);
  }
}

// Remove um item com base no ID informado na rota
async function removerItem(req, res) {
  const { id } = req.params;

  try {
    const item = await itemService.buscarPorId(id);

    if (!item || item.usuarioId !== req.usuario.id) {
      throw { status: 403, message: 'Acesso negado: item não pertence ao usuário' };
    }

    await itemService.removerItem(id);
    res.json({ mensagem: 'Item removido com sucesso' });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

// Exporta as funções para uso nas rotas
module.exports = { criarItem, listarItens, atualizarItem, removerItem };
