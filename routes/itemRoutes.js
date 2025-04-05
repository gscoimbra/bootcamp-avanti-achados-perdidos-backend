const express = require('express');
const router = express.Router();

// Middleware de upload de imagem para itens
const upload = require('../middlewares/upload');

// Importa os métodos do controller responsável por item
const { criarItem, listarItens, atualizarItem, removerItem } = require('../controllers/itemController');

// Rotas para cada criar item, listar, atualizar e remover
router.post('/itens', upload.single('foto'), criarItem); // Esta rota aceita formulário com imagem (upload.single('foto'))
router.get('/itens', listarItens);
router.put('/itens/:id', upload.single('foto'), atualizarItem); // Esta rota aceita formulário com imagem (upload.single('foto'))
router.delete('/itens/:id', removerItem);

// Exporta o roteador para ser usado no index.js
module.exports = router;