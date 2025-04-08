function validarRequisicao(schema) {
    return async (req, res, next) => {
      try {
        await schema.validate(req.body, { abortEarly: false });
        next();
      } catch (err) {
        const mensagens = err.errors || ['Dados inválidos'];
        next({ status: 400, message: mensagens.join('; ') });
      }
    };
  }
  
  module.exports = validarRequisicao;