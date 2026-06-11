// inscripcionRoutes.js - Rutas de inscripciones

import { Router } from "express"
import {listarInscripciones, nuevaInscripcion, cambiarEstado } from '../controllers/inscripcionController.js'
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js'

const router = Router()

/**
 * @swagger
 * /api/inscripciones:
 *   get:
 *     summary: Listar todas las inscripciones
 *     tags: [Inscripciones]
 *     responses:
 *       200:
 *         description: Lista de inscripciones
 */
router.get('/', verificarToken, listarInscripciones)

/**
 * @swagger
 * /api/inscripciones:
 *   post:
 *     summary: Nueva inscripción (pública — formulario)
 *     tags: [Inscripciones]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreApellido:
 *                 type: string
 *                 example: Lucas Rodríguez
 *               actividades:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Natación", "Folklore"]
 *     responses:
 *       201:
 *         description: Inscripción recibida correctamente
 */
router.post('/', nuevaInscripcion)

/**
 * @swagger
 * /api/inscripciones/{id}/estado:
 *   patch:
 *     summary: Cambiar estado de una inscripción (solo ADMIN)
 *     tags: [Inscripciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [CONFIRMADO, PENDIENTE, REVISION]
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       403:
 *         description: Sin permiso
 */
router.patch('/:id/estado', verificarToken, verificarRol('ADMIN'), cambiarEstado)

export default router