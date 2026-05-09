const Categoria = require('../models/Categoria');

// 1. Crear Categoría (POST)
exports.crearCategoria = async (req, res) => {
    try {
        const { nombre, desc } = req.body;
        const nuevaCategoria = new Categoria({ nombre, desc });
        await nuevaCategoria.save();
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la categoría', error: error.message });
    }
};

// 2. Obtener TODAS las Categorías (GET)
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los datos' });
    }
};

// 3. Obtener una categoría por ID (GET)
exports.obtenerCategoriaPorId = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        
        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar la categoría', error: error.message });
    }
};

// 4. Actualizar Categoría (PUT) - NUEVA
exports.actualizarCategoria = async (req, res) => {
    try {
        const { nombre, desc } = req.body;
        
        const categoriaActualizada = await Categoria.findByIdAndUpdate(
            req.params.id,
            { nombre, desc },
            { new: true } // Para que devuelva la categoría ya editada
        );

        if (!categoriaActualizada) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        res.json({ mensaje: 'Categoría actualizada con éxito', categoria: categoriaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la categoría', error: error.message });
    }
};

// 5. Eliminar Categoría (DELETE) - NUEVA
exports.eliminarCategoria = async (req, res) => {
    try {
        const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);

        if (!categoriaEliminada) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        res.json({ mensaje: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la categoría', error: error.message });
    }
};