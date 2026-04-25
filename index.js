require('dotenv').config(); // Asegúrate que la R sea minúscula: require
const app = require('./src/app'); 
const conectarDB = require('./src/config/db'); 

const PORT = process.env.PORT || 3000;

// Ejecutar la conexión a la base de datos
conectarDB();

app.listen(PORT, () => {
    // IMPORTANTE: Nota las comillas inclinadas ` ` (Alt + 96)
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});