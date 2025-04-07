const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // armazena os dados do usuário no req
    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
}

module.exports = verificarToken;
