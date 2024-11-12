const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// Creamos el servidor
const app = express();

// Conectamos a la base de datos
conectarDB();

// Middleware para implementar el paquete cors
app.use(cors());

// Habilitamos que se puedan mandar archivos JSON a nuestra aplicación
app.use(express.json())

app.use('/api/productos', require('./routes/producto'))

// Definimos la ruta principal
app.get('/', (req, res) => {
    res.json('Hola mundo');
});

app.listen(4000, () => {
    console.log('El servidor está escuchando...')
});