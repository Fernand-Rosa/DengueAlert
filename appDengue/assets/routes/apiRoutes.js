import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Configuração do multer para upload de imagem
const uploadDirectory = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDirectory)){
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Endpoint para salvar a imagem e descrição
router.post('/upload', upload.single('image'), (req, res) => {
  const description = req.body.description;
  const imagePath = req.file ? req.file.path : null;

  // Aqui você pode adicionar o código para conectar ao banco de dados e salvar os dados
  // Exemplo:
  const sql = 'INSERT INTO photos (description, imagePath) VALUES (?, ?)';
  db.query(sql, [description, imagePath], (err, result) => {
    if (err) {
             console.error('Erro ao inserir dados:', err);
             res.status(500).send('Erro ao salvar os dados no banco de dados.');
     return;
  }
   res.send('Dados salvos com sucesso!');
   });

  // Temporário para teste
  res.send('Dados salvos com sucesso!');
});

export default router;
