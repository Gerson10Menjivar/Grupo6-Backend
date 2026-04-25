const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        // El link secreto se toma del archivo .env
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('✅ Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:');
        console.error(error.message);
        
        // Si hay error, detiene la aplicación
        process.exit(1); 
    }
};

module.exports = conectarDB;