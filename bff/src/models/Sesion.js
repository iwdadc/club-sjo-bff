// Sesion.js - Esquema de Mongoose para sesiones activas
// MongoDB se usa para almacenar sesiones JWT activas

import mongoose from "mongoose"

const sesionSchema = new mongoose.Schema(
    {
        usuarioId: {
            type:     mongoose.Schema.Types.ObjectId,
            ref:      'Usuario',
        required: true,
        },
        token: {
            type:     String,
            required: true,
        },
        activa: {
            type:    Boolean,
            default: true,
        },
        expiraEn: {
            type:    Date,
            default: () => new Date(Date.now() + 8 * 60 * 60 * 1000),
            index:   { expires: 0 },
        },
    },
    {
        timestamps: true,
    }   
)

export default mongoose.model('Sesion', sesionSchema)
