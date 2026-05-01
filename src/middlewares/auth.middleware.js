const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Obtener el token del header (Authorization: Bearer TOKEN)
    const authHeader = req.get('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ 
            mensaje: 'Acceso denegado. No se proporcionó un token.' 
        });
    }

    // 2. Extraer el token del formato "Bearer <token>"
    // Usamos el espacio como separador y tomamos la segunda posición [1]
    const token = authHeader.split(' ')[1];

    try {
        // 3. Verificar si el token es válido usando la clave del .env
        // Eliminamos la clave provisional para mayor seguridad
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // 4. Guardar los datos del usuario dentro del objeto 'req'
        // Esto permite que los controladores sepan qué usuario está operando
        req.usuarioId = decodedToken.id;
        req.usuarioRol = decodedToken.rol;
        
        // 5. Si todo está bien, pasamos a la siguiente función (el controlador)
        next();
    } catch (error) {
        // Si el token expiró o fue manipulado, entra aquí
        res.status(401).json({ 
            mensaje: 'Token inválido o expirado.' 
        });
    }
};