const yup = require('yup');

const schemaCadastroItem = yup.object().shape({
  nome: yup.string().required('Nome do item é obrigatório'),
  data: yup.date().typeError('Data inválida').required('Data é obrigatória'),
  localizacao: yup.string().required('Localização é obrigatória'),
  contato: yup.string().required('Contato é obrigatório'),
  status: yup.string().oneOf(['PERDIDO', 'ENCONTRADO'], 'Status deve ser PERDIDO ou ENCONTRADO'),
  categoriaId: yup.number().typeError('Categoria inválida').required('Categoria é obrigatória')
});

const schemaAtualizacaoItem = yup.object().shape({
    nome: yup.string(),
    data: yup.date().typeError('Data inválida'),
    localizacao: yup.string(),
    contato: yup.string(),
    status: yup.string().oneOf(['PERDIDO', 'ENCONTRADO'], 'Status deve ser PERDIDO ou ENCONTRADO'),
    categoriaId: yup.number().typeError('Categoria inválida')
  });

module.exports = { schemaCadastroItem, schemaAtualizacaoItem };
