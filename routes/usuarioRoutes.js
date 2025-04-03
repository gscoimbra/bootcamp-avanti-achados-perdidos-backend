const express = require('express');
const router = express.Router();
const { criarUsuario, listarUsuarios, atualizarUsuario, removerUsuario } = require('../controllers/usuarioController');

router.post('/usuarios', criarUsuario);
router.get('/usuarios', listarUsuarios);
router.put('/usuarios/:id', atualizarUsuario);
router.delete('/usuarios/:id', removerUsuario);

module.exports = router;