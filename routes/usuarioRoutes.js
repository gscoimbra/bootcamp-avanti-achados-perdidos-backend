const express = require('express');
const router = express.Router();

// Importa os métodos do controller responsável por usuário
const { criarUsuario, listarUsuarios, atualizarUsuario, removerUsuario } = require('../controllers/usuarioController');

// Rotas para cada criar usuário, listar, atualizar e remover
router.post('/usuarios', criarUsuario);
router.get('/usuarios', listarUsuarios);
router.put('/usuarios/:id', atualizarUsuario);
router.delete('/usuarios/:id', removerUsuario);

// Exporta o roteador para ser usado no index.js
module.exports = router;