// alumnoRoutes.js  

import { Router }          from 'express'
import { listarAlumnos, obtenerAlumno, editarAlumno } from '../controllers/alumnoController.js'
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js'

const router = Router()

/**
 * @swagger
 * /api/alumnos:
 *   get:
 *     summary: Obtener todos los alumnos
 *     tags: [Alumnos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alumnos obtenida correctamente
 *       401:
 *         description: Token inválido o ausente
 */
router.get('/', verificarToken, listarAlumnos)

/**
 * @swagger
 * /api/alumnos/{id}:
 *   get:
 *     summary: Obtener un alumno por ID
 *     tags: [Alumnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Alumno encontrado
 *       404:
 *         description: Alumno no encontrado
 *       401:
 *         description: Token inválido o ausente
 */
router.get('/:id', verificarToken, obtenerAlumno)

/**
 * @swagger
 * /api/alumnos/{id}:
 *   put:
 *     summary: Actualizar un alumno
 *     tags: [Alumnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
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
 *               telefonoAdulto:
 *                 type: string
 *                 example: "11 3456-7890"
 *               estado:
 *                 type: string
 *                 example: CONFIRMADO
 *     responses:
 *       200:
 *         description: Alumno actualizado correctamente
 *       401:
 *         description: Token inválido o ausente
 *       403:
 *         description: Requiere rol ADMIN
 *       404:
 *         description: Alumno no encontrado
 */
router.put('/:id', verificarToken, verificarRol('ADMIN'), editarAlumno)

export default router