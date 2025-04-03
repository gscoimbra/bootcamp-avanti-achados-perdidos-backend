const express = require('express');
const router = express.Router();
const { criarItem, listarItens, atualizarItem, removerItem } = require('../controllers/itemController');

router.post('/itens', criarItem);
router.get('/itens', listarItens);
router.put('/itens/:id', atualizarItem);
router.delete('/itens/:id', removerItem);

module.exports = router;