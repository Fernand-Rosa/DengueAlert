import express from 'express';
import mysql from 'mysql';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Configuração do MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '88158816',
  database: 'crudimagem'
});

// Conectando ao MySQL
db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

// Configuração do multer para upload de imagem
const uploadDirectory = path.join(__dirname, 'uploads');

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

// Middleware para lidar com CORS
app.use(cors());
app.use(express.json());

// Endpoint para salvar a imagem e descrição
app.post('/api/upload', upload.single('image'), (req, res) => {
  const description = req.body.description;
  const imagePath = req.file ? req.file.path : null;

  const sql = 'INSERT INTO photos (description, imagePath) VALUES (?, ?)';
  db.query(sql, [description, imagePath], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao salvar os dados no banco de dados.');
      return;
    }
    res.send('Dados salvos com sucesso!');
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
