const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarCategoria(data) {
  return prisma.categoria.create({ data });
}

async function listarCategorias() {
  return prisma.categoria.findMany();
}

async function atualizarCategoria(id, data) {
  return prisma.categoria.update({
    where: { id: parseInt(id) },
    data
  });
}

async function removerCategoria(id) {
  return prisma.categoria.delete({
    where: { id: parseInt(id) }
  });
}

module.exports = {
  criarCategoria,
  listarCategorias,
  atualizarCategoria,
  removerCategoria
};
