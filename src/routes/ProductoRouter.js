const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// IMPORTAMOS el middleware
const auth = require('../middlewares/auth.middleware'); 

// --- TODAS LAS RUTAS DE PRODUCTOS AHORA SON PRIVADAS ---
// El middleware 'auth' se asegura de que nadie pase sin un token válido

router.get('/', auth, productoController.obtenerProductos);
router.get('/:id', auth, productoController.obtenerProductoPorId);
router.post('/', auth, productoController.crearProducto);
router.put('/:id', auth, productoController.actualizarProducto);
router.delete('/:id', auth, productoController.eliminarProducto);

module.exports = router;