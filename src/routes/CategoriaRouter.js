const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/CategoriaController');

router.post('/', categoriaController.crearCategoria);
router.get('/', categoriaController.obtenerCategorias);

// AGREGA ESTA LÍNEA:
router.get('/:id', categoriaController.obtenerCategoriaPorId);

module.exports = router;