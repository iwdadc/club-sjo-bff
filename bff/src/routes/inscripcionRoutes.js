// inscripcionRoutes.js - Rutas de inscripciones

import { Router } from "express"
import {listarInscripciones,
  nuevaInscripcion,
  cambiarEstado,
} from '../controllers/inscripcionController.js'
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js'

const router = Router()

// Pública el formulario del front envía inscripciones sin login
router.post('/', nuevaInscripcion)

// Protegidas — requieren JWT
router.get('/', verificarToken, listarInscripciones)
router.patch('/:id/estado', verificarToken, verificarRol('ADMIN'), cambiarEstado)

export default router

