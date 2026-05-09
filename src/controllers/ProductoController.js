const Producto = require('../models/Producto');

// 1. Obtener TODOS los productos (GET)
exports.obtenerProductos = async (req, res) => {
    try {
        // El .populate trae el nombre de la categoría en lugar de solo el ID
        const productos = await Producto.find().populate('categoria', 'nombre');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
};

// 2. Obtener UN SOLO producto por ID (GET)
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

// 3. Crear Producto (POST)
exports.crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar', error: error.message });
    }
};

// 4. Actualizar Producto (PUT) - NUEVA
exports.actualizarProducto = async (req, res) => {
    try {
        // { new: true } hace que retorne el producto ya editado
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto actualizado con éxito', producto: productoActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el producto', error: error.message });
    }
};

// 5. Eliminar Producto (DELETE) - NUEVA
exports.eliminarProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
    }
};