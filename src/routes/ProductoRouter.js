const express = require('express');
const router = express.Router();
// IMPORTANTE: 'P' Mayúscula para que Docker (Linux) lo encuentre
const productoController = require('../controllers/ProductoController');

// IMPORTAMOS el middleware
const auth = require('../middlewares/auth.middleware'); 

// --- TODAS LAS RUTAS DE PRODUCTOS ---
router.get('/', auth, productoController.obtenerProductos);
router.get('/:id', auth, productoController.obtenerProductoPorId);
router.post('/', auth, productoController.crearProducto);
router.put('/:id', auth, productoController.actualizarProducto);
router.delete('/:id', auth, productoController.eliminarProducto);

module.exports = router;