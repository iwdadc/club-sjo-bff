// CacheInscripcion.js - Esquema de caché para inscripciones
// Este caché evita llamar al backend Java en cada petición
// TTL de 5 minutos

import mongoose from 'mongoose'

const cacheInscripcionSchema = new mongoose.Schema(
  {
    clave: {
        type:     String,
        required: true,
        unique:   true,
    },
    datos: {
        type:  mongoose.Schema.Types.Mixed,
        required: true,
    },
    expiraEn: {
        type:    Date,
        default: () => new Date(Date.now() + 5 * 60 * 1000), 
        index:   { expires: 0 }, 
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('CacheInscripcion', cacheInscripcionSchema)