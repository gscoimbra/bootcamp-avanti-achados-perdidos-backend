const yup = require('yup');

const schemaCadastroCategoria = yup.object().shape({
  nome: yup.string().required('Nome da categoria é obrigatório')
});

const schemaAtualizacaoCategoria = yup.object().shape({
    nome: yup.string()
  });

module.exports = { schemaCadastroCategoria, schemaAtualizacaoCategoria };
