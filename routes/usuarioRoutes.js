const express = require('express');
const router = express.Router();

// Importa os métodos do controller responsável por usuário
const { criarUsuario, listarUsuarios, atualizarUsuario, removerUsuario, login } = require('../controllers/usuarioController');
const { schemaCadastroUsuario, schemaAtualizacaoUsuario } = require('../validators/usuarioValidator');
const validar = require('../middlewares/validarRequisicao');

// Rotas para cada criar usuário, listar, atualizar e remover
router.post('/usuarios', validar(schemaCadastroUsuario), criarUsuario);
router.get('/usuarios', listarUsuarios);
router.put('/usuarios/:id', validar(schemaAtualizacaoUsuario), atualizarUsuario);
router.delete('/usuarios/:id', removerUsuario);

// Rota de login
router.post('/login', login)

// Exporta o roteador para ser usado no index.js
module.exports = router;