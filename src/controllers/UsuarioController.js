const Usuario = require('../models/Usuario');

exports.crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear usuario', error: error.message });
    }
};

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
};

// --- AGREGAMOS ESTA FUNCIÓN PARA LA TAREA ---
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        
        // Devolvemos el usuario (puedes elegir no devolver la contraseña por seguridad)
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar el usuario', error: error.message });
    }
};