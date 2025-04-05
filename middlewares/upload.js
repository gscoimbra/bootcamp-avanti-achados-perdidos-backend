const multer = require('multer');
const path = require('path');

// Define onde salvar e como nomear os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // pasta onde a imagem será salva
  },
  // Define o nome do arquivo como: timestamp + nome original
  filename: (req, file, cb) => {
    const nomeUnico = Date.now() + '-' + file.originalname;
    cb(null, nomeUnico);
  }
});

// Cria o middleware de upload usando a configuração de storage definida acima
const upload = multer({ storage });

// Exporta o middleware para uso nas rotas (ex: upload.single('foto'))
module.exports = upload;
