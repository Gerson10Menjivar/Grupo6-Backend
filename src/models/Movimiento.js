const mongoose = require('mongoose');

const MovimientoSchema = new mongoose.Schema({
    // Conexión con el Producto
    producto: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Producto', 
        required: true 
    },
    // Conexión con el Usuario (quién hizo el cambio)
    usuario: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: true 
    },
    tipo: { 
        type: String, 
        enum: ['entrada', 'salida'], 
        required: true 
    },
    cantidad: { 
        type: Number, 
        required: true 
    },
    motivo: { 
        type: String, 
        trim: true 
    }
}, { 
    timestamps: true, // Esto crea 'createdAt' que será tu FECHA de historial
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual para que Angular lea 'id'
MovimientoSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

module.exports = mongoose.model('Movimiento', MovimientoSchema);