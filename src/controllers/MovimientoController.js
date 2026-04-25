const Movimiento = require('../models/Movimiento');
const Producto = require('../models/Producto');

// 1. REGISTRAR MOVIMIENTO (POST /api/movimientos)
// Actualiza el stock automáticamente y guarda el registro
exports.registrarMovimiento = async (req, res) => {
    try {
        const { producto, usuario, tipo, cantidad, motivo } = req.body;

        // Buscar el producto para verificar existencia y stock actual
        const productoEncontrado = await Producto.findById(producto);
        if (!productoEncontrado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        // Calcular el nuevo stock basado en el tipo de movimiento
        let nuevoStock = productoEncontrado.stock;
        if (tipo === 'entrada') {
            nuevoStock += cantidad;
        } else if (tipo === 'salida') {
            if (productoEncontrado.stock < cantidad) {
                return res.status(400).json({ mensaje: 'Error: Stock insuficiente para realizar la salida' });
            }
            nuevoStock -= cantidad;
        } else {
            return res.status(400).json({ mensaje: 'Tipo de movimiento no válido (debe ser entrada o salida)' });
        }

        // Actualizar el stock en la colección de Productos
        productoEncontrado.stock = nuevoStock;
        await productoEncontrado.save();

        // Crear el registro en el historial de Movimientos
        const nuevoMovimiento = new Movimiento({
            producto,
            usuario,
            tipo,
            cantidad,
            motivo
        });

        await nuevoMovimiento.save();

        res.status(201).json({
            mensaje: 'Movimiento registrado con éxito',
            stockActualizado: nuevoStock,
            detalle: nuevoMovimiento
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al procesar el movimiento', error: error.message });
    }
};

// 2. OBTENER TODO EL HISTORIAL (GET /api/movimientos o /api/historial)
exports.obtenerHistorial = async (req, res) => {
    try {
        const historial = await Movimiento.find()
            .populate('producto', 'nombre') 
            .populate('usuario', 'nombre')
            .sort({ createdAt: -1 }); // Los más recientes primero

        res.json(historial);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el historial' });
    }
};

// 3. OBTENER UN MOVIMIENTO ESPECÍFICO POR ID (GET /api/movimientos/:id)
// Requerido por la guía de actividades
exports.obtenerMovimientoPorId = async (req, res) => {
    try {
        const movimiento = await Movimiento.findById(req.params.id)
            .populate('producto', 'nombre')
            .populate('usuario', 'nombre');
        
        if (!movimiento) {
            return res.status(404).json({ mensaje: 'Registro no encontrado' });
        }
        
        res.json(movimiento);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar el registro', error: error.message });
    }
};