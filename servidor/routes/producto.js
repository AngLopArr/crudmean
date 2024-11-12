// Rutas para producto
const express = require('express');
const router = express.Router();
const producto_controller = require('../controllers/producto_controller');

// api/productos
router.post('/', producto_controller.crearProducto);
router.get('/', producto_controller.obtenerProductos);
router.put('/:id', producto_controller.actualizarProducto);
router.get('/:id', producto_controller.obtenerProducto);
router.delete('/:id', producto_controller.eliminarProducto)

module.exports = router;