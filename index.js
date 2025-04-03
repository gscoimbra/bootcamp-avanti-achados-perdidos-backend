// index.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const itemRoutes = require('./routes/itemRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/', itemRoutes);
app.use('/', usuarioRoutes);
app.use('/', categoriaRoutes);

// Rota teste
app.get('/', (req, res) => {
  res.send('API Achados e Perdidos está no ar!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});