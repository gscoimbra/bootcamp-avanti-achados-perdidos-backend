const express = require('express');
const router = express.Router();
const { criarCategoria, listarCategorias, atualizarCategoria, removerCategoria } = require('../controllers/categoriaController');

router.post('/categorias', criarCategoria);
router.get('/categorias', listarCategorias);
router.put('/categorias/:id', atualizarCategoria);
router.delete('/categorias/:id', removerCategoria);

module.exports = router;