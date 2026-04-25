const Producto = require('../models/Producto');

// 1. Obtener TODOS los productos (GET /api/productos)
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('categoria', 'nombre');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
};

// 2. Obtener UN SOLO producto por ID (GET /api/productos/:id)
// * ESTO ES LO QUE TE PIDE LA GUÍA *
exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('categoria', 'nombre');
        
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar el producto', error: error.message });
    }
};

// 3. Crear Producto (POST /api/productos)
exports.crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar', error: error.message });
    }
};