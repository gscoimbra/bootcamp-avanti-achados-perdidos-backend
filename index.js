const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Importa os arquivos de rotas
const itemRoutes = require('./routes/itemRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const app = express();
const prisma = new PrismaClient(); // Instancia o cliente Prisma para acessar o banco

// Middleware que libera o acesso CORS (para requisições externas, ex: front-end)
app.use(cors());

// Middleware que permite interpretar JSON no corpo das requisições
app.use(express.json());

// Registra as rotas principais
app.use('/', itemRoutes);
app.use('/', usuarioRoutes);
app.use('/', categoriaRoutes);
app.use('/uploads', express.static('uploads')); // Permite acessar imagens da pasta /uploads via URL

// Rota raiz para teste de funcionamento da API
app.get('/', (req, res) => {
  res.send('API Achados e Perdidos está no ar!');
});

// Define a porta do servidor e inicia a aplicação
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});