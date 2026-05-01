const express = require('express');
const cors = require('cors');

const app = express();

// --- MIDDLEWARES GLOBALES ---
app.use(cors()); // Permite peticiones desde otros servidores (como Postman o el Frontend)
app.use(express.json()); // Permite que el servidor entienda archivos JSON

// --- RUTAS DE LA API ---

// 1. Autenticación (Login y Registro)
// Esta es la más importante para esta tarea. 
// Usaremos el archivo de rutas que acabamos de blindar.
app.use('/api/auth', require('./routes/UsuarioRouter')); 

// 2. Usuarios (Gestión de perfiles)
app.use('/api/usuarios', require('./routes/UsuarioRouter'));

// 3. Categorías
app.use('/api/categorias', require('./routes/CategoriaRouter'));

// 4. Productos
app.use('/api/productos', require('./routes/ProductoRouter'));

// 5. Movimientos
app.use('/api/movimientos', require('./routes/MovimientoRouter'));

// 6. Historial
app.use('/api/historial', require('./routes/HistorialRouter'));


// --- RUTA DE PRUEBA (Health Check) ---
app.get('/', (req, res) => {
    res.send('API de Inventario - Servidor funcionando correctamente ✅');
});

module.exports = app;