const express = require('express');
const path = require('path');
require('dotenv').config();


// Configuración de base de datos
const { dbConnection } = require('./database/config');
dbConnection.authenticate()
  .then(() => console.log('Conexos-Backend$: Conexión a la base de datos establecida correctamente.'))
  .catch(err => console.error('Conexos-Backend$: Error al conectar a la base de datos:', err));

const app = express();

// 📨 Parseo del body en JSON
app.use(express.json());

// 🌐 Carpeta pública
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// 🛣 Rutas de la API
app.use('/events', require('./routes/events'));
app.use('/reviews', require('./routes/reviews'));
app.use('/', require('./routes/version'));

// 🖥️ Levanta el servidor en el puerto asignado por el hosting
app.listen(PORT, HOST, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log(`Conexos-Backend$: Servidor escuchando en ${HOST}:${PORT}`);
  }
});
