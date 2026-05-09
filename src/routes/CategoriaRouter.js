const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/CategoriaController');
const auth = require('../middlewares/auth.middleware'); 

// --- RUTAS DE CATEGORÍAS ---

// 1. Obtener todas las categorías (Pública)
router.get('/', categoriaController.obtenerCategorias);

// 2. Obtener una categoría por ID (Pública)
router.get('/:id', categoriaController.obtenerCategoriaPorId);

// 3. Crear una nueva categoría (PROTEGIDA: Requiere Token)
router.post('/', auth, categoriaController.crearCategoria);

// 4. Actualizar una categoría (PROTEGIDA: Requiere Token)
router.put('/:id', auth, categoriaController.actualizarCategoria);

// 5. Eliminar una categoría (PROTEGIDA: Requiere Token)
router.delete('/:id', auth, categoriaController.eliminarCategoria);

module.exports = router;