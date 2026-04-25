const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    desc: { type: String }, // Descripción opcional para el futuro
    precio: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    // Este es tu 'catId' en el backend
    categoria: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categoria', 
        required: true 
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Para que Angular use 'id' en lugar de '_id'
ProductoSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

module.exports = mongoose.model('Producto', ProductoSchema);