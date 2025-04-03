const multer = require('multer');
const path = require('path');

// Define onde salvar e como nomear os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // pasta onde a imagem será salva
  },
  filename: (req, file, cb) => {
    const nomeUnico = Date.now() + '-' + file.originalname;
    cb(null, nomeUnico);
  }
});

const upload = multer({ storage });

module.exports = upload;
