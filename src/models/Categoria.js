const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    desc: { 
        type: String, 
        required: true 
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Esto permite que Angular use cat.id en lugar de _id
CategoriaSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

module.exports = mongoose.model('Categoria', CategoriaSchema);