const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/MovimientoController');

// Esta ruta servirá para mostrar la tabla completa en Angular
// URL: /api/historial
router.get('/', movimientoController.obtenerHistorial);

module.exports = router;