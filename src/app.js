const express = require('express');
const cors = require('cors');

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- RUTAS ---

// 1. Usuarios
app.use('/api/usuarios', require('./routes/UsuarioRouter'));

// 2. Categorías
app.use('/api/categorias', require('./routes/CategoriaRouter'));

// 3. Productos
app.use('/api/productos', require('./routes/ProductoRouter'));

// 4. Movimientos
app.use('/api/movimientos', require('./routes/MovimientoRouter'));

// 5. Historial
app.use('/api/historial', require('./routes/HistorialRouter'));

// --- RUTA DE PRUEBA ---
app.get('/', (req, res) => {
    res.send('API de Inventario - Servidor funcionando correctamente ✅');
});

module.exports = app;