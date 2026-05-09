const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para generar el token de acceso

// 1. REGISTRAR USUARIO
exports.registrar = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordEncriptado = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: passwordEncriptado,
            rol
        });

        await nuevoUsuario.save();
        res.status(201).json({ 
            mensaje: 'Usuario registrado con éxito', 
            id: nuevoUsuario._id 
        });

    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error al registrar usuario', 
            error: error.message 
        });
    }
};

// 2. LOGIN DE USUARIO
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        if (usuario.estado && usuario.estado !== 'Activo') {
            return res.status(403).json({ mensaje: 'Usuario inactivo' });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            mensaje: 'Login correcto',
            token,
            usuario: { 
                id: usuario._id, 
                nombre: usuario.nombre,
                email: usuario.email, 
                rol: usuario.rol 
            }
        });

    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error en el proceso de login', 
            error: error.message 
        });
    }
};

// 3. OBTENER TODOS LOS USUARIOS
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
};

// 4. OBTENER USUARIO POR ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select('-password');
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error al buscar el usuario', 
            error: error.message 
        });
    }
};

// 5. ACTUALIZAR USUARIO (NUEVO)
exports.actualizarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, rol, estado } = req.body;
        const updates = { nombre, email, rol, estado };

        // Si se envía una nueva contraseña, se encripta antes de actualizar
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true } 
        ).select('-password');

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ 
            mensaje: 'Usuario actualizado con éxito', 
            usuario: usuarioActualizado 
        });
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error al actualizar usuario', 
            error: error.message 
        });
    }
};

// 6. ELIMINAR USUARIO (NUEVO)
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ 
            mensaje: 'Error al eliminar usuario', 
            error: error.message 
        });
    }
};