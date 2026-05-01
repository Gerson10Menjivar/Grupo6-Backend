const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Para generar el token de acceso

// 1. REGISTRAR USUARIO
exports.registrar = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // Verificar si el correo ya existe para evitar duplicados
        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        // ENCRIPTAR LA CONTRASEÑA antes de guardar
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptado = await bcrypt.hash(password, salt);

        // Crear el objeto con la contraseña segura
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

        // Buscar el usuario por email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        // Si tu modelo tiene 'estado', validamos que esté Activo
        if (usuario.estado && usuario.estado !== 'Activo') {
            return res.status(403).json({ mensaje: 'Usuario inactivo' });
        }

        // VALIDAR LA CONTRASEÑA comparando el texto plano con el hash
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        // CREAR EL TOKEN JWT usando las variables del .env
        // Eliminamos las claves de respaldo para obligar el uso de .env
        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Devolver el resultado exitoso con el token
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

// 3. OBTENER TODOS LOS USUARIOS (Protegida por middleware en rutas)
exports.obtenerUsuarios = async (req, res) => {
    try {
        // Usamos .select('-password') para que la clave NUNCA viaje por la red
        const usuarios = await Usuario.find().select('-password');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
};

// 4. OBTENER USUARIO POR ID (Protegida por middleware en rutas)
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