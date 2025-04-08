function erroHandler(err, req, res, next) {
    console.error(err);
  
    const status = err.status || 500;
    const mensagem = err.message || 'Erro interno do servidor';
  
    res.status(status).json({ erro: mensagem });
  }
  
  module.exports = erroHandler;
  