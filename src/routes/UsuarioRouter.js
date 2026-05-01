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

// Solo usuarios logueados pueden ver la lista completa
router.get('/', auth, authController.obtenerUsuarios);

// Solo usuarios logueados pueden ver un perfil por ID
router.get('/:id', auth, authController.obtenerUsuarioPorId);

module.exports = router;