// authRoutes.js - Rutas de autenticación

import { Router } from 'express'
import { login, logout, verificarSesion } from '../controllers/authController.js'
import { verificarToken } from '../middlewares/authMiddleware.js'

const router = Router()

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@sanjoseobrero.ar
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login exitoso — devuelve token JWT
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', login)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente
 */
router.post('/logout', verificarToken, logout)

/**
 * @swagger
 * /api/auth/verificar:
 *   get:
 *     summary: Verificar sesión activa
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión válida
 *       401:
 *         description: Token inválido o expirado
 */
router.get('/verificar', verificarToken, verificarSesion)

export default router