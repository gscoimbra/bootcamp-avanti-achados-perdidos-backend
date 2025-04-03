const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarItem(req, res) {
  try {
    const {
      nome,
      data,
      localizacao,
      contato,
      foto,
      status,
      usuarioId,
      categoriaId
    } = req.body;

    const novoItem = await prisma.item.create({
      data: {
        nome,
        data: new Date(data),
        localizacao,
        contato,
        foto,
        status,
        usuarioId,
        categoriaId
      }
    });

    res.status(201).json(novoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar item' });
  }
}

async function listarItens(req, res) {
    try {
      const { status, categoriaId, localizacao, busca } = req.query;
  
      const itens = await prisma.item.findMany({
        where: {
          status: status || undefined,
          categoriaId: categoriaId ? parseInt(categoriaId) : undefined,
          localizacao: localizacao ? {
            contains: localizacao,
            mode: 'insensitive'
          } : undefined,
          nome: busca ? {
            contains: busca,
            mode: 'insensitive'
          } : undefined
        },
        include: {
          categoria: true,
          usuario: true
        },
        orderBy: {
          data: 'desc'
        }
      });
  
      res.json(itens);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao listar itens' });
    }
  }
  
  async function atualizarItem(req, res) {
    const { id } = req.params;
    const {
      nome,
      data,
      localizacao,
      contato,
      foto,
      status,
      usuarioId,
      categoriaId
    } = req.body;
  
    try {
      const itemAtualizado = await prisma.item.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          data: new Date(data),
          localizacao,
          contato,
          foto,
          status,
          usuarioId,
          categoriaId
        }
      });
  
      res.json(itemAtualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar item' });
    }
  }
  
  async function removerItem(req, res) {
    const { id } = req.params;
  
    try {
      await prisma.item.delete({
        where: { id: parseInt(id) }
      });
  
      res.json({ mensagem: 'Item removido com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao remover item' });
    }
  }

module.exports = { criarItem, listarItens, atualizarItem, removerItem };
