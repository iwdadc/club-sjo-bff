// CacheActividad.js

import mongoose from 'mongoose'

const cacheActividadSchema = new mongoose.Schema(
    {
        clave: {
            type:     String,
            required: true,
            unique:   true,
        },
        datos: {
            type:     mongoose.Schema.Types.Mixed,
            required: true,
        },
        expiraEn: {
            type:    Date,
            default: () => new Date(Date.now() + 60 * 60 * 1000), // 1 hora
            index:   { expires: 0 },
        },
    },
    { timestamps: true }
)

export default mongoose.model('CacheActividad', cacheActividadSchema)