const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioController');

// Ruta para crear usuario: POST /api/usuarios
router.post('/', usuarioController.crearUsuario);

// Ruta para ver TODOS los usuarios: GET /api/usuarios
router.get('/', usuarioController.obtenerUsuarios);

// --- ESTA ES LA LÍNEA QUE AGREGAMOS ---
// Ruta para ver UN SOLO usuario: GET /api/usuarios/:id
router.get('/:id', usuarioController.obtenerUsuarioPorId);

module.exports = router;