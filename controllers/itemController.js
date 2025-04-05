// Instancia o cliente do Prisma para interagir com o banco de dados
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Cria um novo item com dados do corpo da requisição e imagem (se enviada)
async function criarItem(req, res) {
  try {
    const {
      nome,
      data,
      localizacao,
      contato,
      status,
      usuarioId,
      categoriaId
    } = req.body;

    // Se o arquivo 'foto' foi enviado, salva o nome do arquivo
    const foto = req.file ? req.file.filename : null;

    const novoItem = await prisma.item.create({
      data: {
        nome,
        data: new Date(data),
        localizacao,
        contato,
        foto,
        status,
        usuarioId: parseInt(usuarioId), // garante que Prisma receba número, não string
        categoriaId: parseInt(categoriaId) // garante que Prisma receba número, não string
      }
    });

    res.status(201).json(novoItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar item' });
  }
}

// Lista todos os itens com filtros opcionais por status, categoria, localização ou nome
async function listarItens(req, res) {
    try {

      // Aplica filtros opcionais com base nos parâmetros da query
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
        include: { // Isso aqui é o seguinte, é como se eu estivesse falando para o Prisma, ""Prisma, me traga todos os itens, e junto de cada item, me envie os dados da categoria e do usuário relacionados.""
          categoria: true, // Traz os dados da categoria relacionada
          usuario: true // Traz os dados do usuário relacionado
        },
        orderBy: {
          data: 'desc' // Ordena da mais recente para a mais antiga
        }
      });
  
      res.json(itens);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao listar itens' });
    }
  }
  
  // Atualiza os dados de um item existente pelo ID, inclusive a imagem (se enviada)
  async function atualizarItem(req, res) {
    const { id } = req.params;
    const {
      nome,
      data,
      localizacao,
      contato,
      status,
      usuarioId,
      categoriaId
    } = req.body;
  
    try {
      // Se uma nova imagem foi enviada, substitui a atual
      const foto = req.file ? req.file.filename : undefined;
  
      const itemAtualizado = await prisma.item.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          data: new Date(data),
          localizacao,
          contato,
          foto, // se undefined, o Prisma ignora e mantém a anterior
          status,
          usuarioId: parseInt(usuarioId),
          categoriaId: parseInt(categoriaId)
        }
      });
  
      res.json(itemAtualizado);
    } catch (error) {
      console.error('[ERRO AO ATUALIZAR ITEM]', error);
      res.status(500).json({ erro: 'Erro ao atualizar item' });
    }
  }
  
  // Remove um item com base no ID informado na rota
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
