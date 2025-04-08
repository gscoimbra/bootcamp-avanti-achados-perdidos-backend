const express = require('express');
const router = express.Router();

// Middleware de upload de imagem para itens
const upload = require('../middlewares/upload');

// Para proteger as rotas
const verificarToken = require('../middlewares/auth');

// Importa os métodos do controller responsável por item
const { criarItem, listarItens, atualizarItem, removerItem } = require('../controllers/itemController');

const validar = require('../middlewares/validarRequisicao');
const { schemaCadastroItem, schemaAtualizacaoItem } = require('../validators/itemValidator');

// Rotas para cada criar item, listar, atualizar e remover
router.post('/itens', verificarToken, upload.single('foto'), validar(schemaCadastroItem), criarItem); // Esta rota aceita formulário com imagem (upload.single('foto'))
router.get('/itens', listarItens);
router.put('/itens/:id', verificarToken, upload.single('foto'), validar(schemaAtualizacaoItem), atualizarItem); // Esta rota aceita formulário com imagem (upload.single('foto'))
router.delete('/itens/:id', verificarToken, removerItem);

// Exporta o roteador para ser usado no index.js
module.exports = router;