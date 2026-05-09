const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ 
            mensaje: 'Acceso denegado. No se proporcionó un token.' 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // Guardamos los datos para usarlos en los controladores si hace falta
        req.usuarioId = decodedToken.id;
        req.usuarioRol = decodedToken.rol;
        
        next(); // 👈 Si todo está bien, permite pasar al controlador
    } catch (error) {
        res.status(401).json({ 
            mensaje: 'Token inválido o expirado.' 
        });
    }
};

// ESTA LÍNEA ES LA QUE CONECTA CON EL ROUTER
module.exports = auth;