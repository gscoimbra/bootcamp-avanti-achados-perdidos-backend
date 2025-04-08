const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarItem(data) {
  return prisma.item.create({ data });
}

async function listarItens(filtros) {
  const { status, categoriaId, localizacao, busca } = filtros;

  return prisma.item.findMany({
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
}

async function atualizarItem(id, data) {
  return prisma.item.update({
    where: { id: parseInt(id) },
    data
  });
}

async function removerItem(id) {
  return prisma.item.delete({
    where: { id: parseInt(id) }
  });
}

async function buscarPorId(id) {
  return prisma.item.findUnique({
    where: { id: parseInt(id) }
  });
}

module.exports = { criarItem, listarItens, atualizarItem, removerItem, buscarPorId };
