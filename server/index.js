// Archivo principal del servidor Express
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rutas
// app.use('/api/usuarios', require('./routes/usuarios'));
// app.use('/api/bootcamps', require('./routes/bootcamps'));

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
