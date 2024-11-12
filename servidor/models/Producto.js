const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
}, {collection: 'productos'}); // Si no pones nada, crea una colección automáticamente con el plural del objeto

module.exports = mongoose.model('Producto', ProductoSchema);