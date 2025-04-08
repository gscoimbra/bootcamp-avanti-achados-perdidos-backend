const yup = require('yup');

// Usado no POST /usuarios
const schemaCadastroUsuario = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  telefone: yup.string().nullable().matches(/^\d{10,11}$/, 'Telefone deve conter 10 ou 11 dígitos'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória')
});

// Usado no PUT /usuarios/:id
const schemaAtualizacaoUsuario = yup.object().shape({
  nome: yup.string(),
  telefone: yup.string().nullable().matches(/^\d{10,11}$/, 'Telefone deve conter 10 ou 11 dígitos'),
  email: yup.string().email('E-mail inválido')
});

module.exports = { schemaCadastroUsuario, schemaAtualizacaoUsuario };
