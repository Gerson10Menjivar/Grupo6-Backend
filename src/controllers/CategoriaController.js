const Categoria = require('../models/Categoria');

// Crear Categoría (POST)
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

// Obtener TODAS las Categorías (GET /api/categorias)
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los datos' });
    }
};

// --- ESTA ES LA FUNCIÓN QUE TE FALTA PARA LA TAREA ---
// Obtener una categoría por ID (GET /api/categorias/:id)
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