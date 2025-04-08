const express = require('express');
const router = express.Router();

// Importa os métodos do controller responsável por categorias
const { criarCategoria, listarCategorias, atualizarCategoria, removerCategoria } = require('../controllers/categoriaController');

const validar = require('../middlewares/validarRequisicao');
const { schemaCadastroCategoria, schemaAtualizacaoCategoria } = require('../validators/categoriaValidator');

// Rotas para cada criar categorias, listar, atualizar e remover
router.post('/categorias', validar(schemaCadastroCategoria), criarCategoria);
router.get('/categorias', listarCategorias);
router.put('/categorias/:id', validar(schemaAtualizacaoCategoria), atualizarCategoria);
router.delete('/categorias/:id', removerCategoria);

// Exporta o roteador para uso no index.js
module.exports = router;