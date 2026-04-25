const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/MovimientoController');

// Para registrar (POST)
router.post('/', movimientoController.registrarMovimiento);

// Para ver todo el historial (GET)
router.get('/', movimientoController.obtenerHistorial);

// --- LA LÍNEA QUE AGREGAMOS PARA LA TAREA ---
router.get('/:id', movimientoController.obtenerMovimientoPorId);

module.exports = router;