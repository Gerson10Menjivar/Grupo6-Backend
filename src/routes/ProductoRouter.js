const express = require('express');
const router = express.Router();
const productoController = require('../controllers/ProductoController');

router.get('/', productoController.obtenerProductos);
router.post('/', productoController.crearProducto);

// Línea clave para la tarea:
router.get('/:id', productoController.obtenerProductoPorId);

module.exports = router;