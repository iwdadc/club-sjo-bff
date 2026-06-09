// Usuario.js - Esquema de Mongoose para usuarios del sistema

import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema(
    {
        email: {
            type:     String,
            required: true,
            unique:   true,
            index:    true,
            lowercase: true,
            trim:     true,
        },
        passwordHash: {
            type:     String,
            required: true,
            minlength: 60,
            select: false
        },
        nombre: {
            type:     String,
            required: true,
        },
        rol: {
            type:     String,
            enum:     ['ADMIN', 'PROFESOR'],
            required: true,
        },
  },
  {
    timestamps: true, // agrega createdAt y updatedAt automáticamente
  }
)
