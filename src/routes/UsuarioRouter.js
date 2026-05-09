const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// IMPORTAMOS EL MIDDLEWARE (El guardaespaldas)
const auth = require('../middlewares/auth.middleware');

// --- RUTAS PÚBLICAS ---
// Cualquiera puede registrarse o loguearse para obtener su llave (token)
router.post('/registrar', authController.registrar);
router.post('/login', authController.login);


// --- RUTAS PRIVADAS ---
// Agregamos 'auth' antes del controlador para bloquear el acceso no autorizado

// 1. Obtener la lista completa de usuarios
router.get('/', auth, authController.obtenerUsuarios);

// 2. Obtener un usuario específico por su ID
router.get('/:id', auth, authController.obtenerUsuarioPorId);

// 3. Actualizar los datos de un usuario (NUEVA)
// Usamos PUT porque vamos a enviar los datos para modificar un recurso existente
router.put('/:id', auth, authController.actualizarUsuario);

// 4. Eliminar un usuario del sistema (NUEVA)
// Usamos DELETE para borrar el registro por su ID
router.delete('/:id', auth, authController.eliminarUsuario);

module.exports = router;