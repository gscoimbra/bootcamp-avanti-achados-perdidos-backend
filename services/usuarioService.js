const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function criarUsuario({ nome, telefone, email, senha }) {
  const senhaHash = await bcrypt.hash(senha, 10); // Criptografa a senha

  return prisma.usuario.create({
    data: {
      nome,
      telefone,
      email,
      senha: senhaHash
    }
  });
}

async function listarUsuarios() {
  return prisma.usuario.findMany();
}

async function atualizarUsuario(id, data) {
  return prisma.usuario.update({
    where: { id: parseInt(id) },
    data
  });
}

async function removerUsuario(id) {
  return prisma.usuario.delete({
    where: { id: parseInt(id) }
  });
}

async function buscarPorEmail(email) {
  return prisma.usuario.findUnique({ where: { email } });
}

module.exports = { criarUsuario, listarUsuarios, atualizarUsuario, removerUsuario, buscarPorEmail };
