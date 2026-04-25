 exports.obtenerHistorial = async (req, res) => {
    try {
        const historialCompleto = await Movimiento.find()
            .populate('producto', 'nombre precio') // Traemos nombre y precio del producto
            .populate('usuario', 'nombre email')  // Traemos quién lo hizo
            .populate({
                path: 'producto',
                populate: { path: 'categoria', select: 'nombre' } // ¡Incluso traemos la categoría!
            })
            .sort({ createdAt: -1 }); // El más reciente arriba

        res.json(historialCompleto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al generar el historial' });
    }
};