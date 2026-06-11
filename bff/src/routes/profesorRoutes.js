import { Router }       from 'express'
import { listarProfesores, nuevoProfesor, modificarProfesor, borrarProfesor } from '../controllers/profesorController.js'
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js'

const router = Router()

/**
 * @swagger
 * /api/profesores:
 *   get:
 *     summary: Obtener todos los profesores
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de profesores obtenida correctamente
 *       401:
 *         description: Token inválido o ausente
 */
router.get('/', verificarToken, listarProfesores)

/**
 * @swagger
 * /api/profesores:
 *   post:
 *     summary: Crear un nuevo profesor
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Ricardo
 *               apellido:
 *                 type: string
 *                 example: Sosa
 *               email:
 *                 type: string
 *                 example: profesor@sanjoseobrero.ar
 *     responses:
 *       201:
 *         description: Profesor creado correctamente
 *       403:
 *         description: Requiere rol ADMIN
 */
router.post('/', verificarToken, verificarRol('ADMIN'), nuevoProfesor)

/**
 * @swagger
 * /api/profesores/{id}:
 *   put:
 *     summary: Modificar un profesor existente
 *     tags: [Profesores]
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
 *               nombre:
 *                 type: string
 *                 example: Ricardo
 *               apellido:
 *                 type: string
 *                 example: Sosa
 *     responses:
 *       200:
 *         description: Profesor actualizado correctamente
 *       403:
 *         description: Requiere rol ADMIN
 *       404:
 *         description: Profesor no encontrado
 */
router.put('/:id', verificarToken, verificarRol('ADMIN'), modificarProfesor)

/**
 * @swagger
 * /api/profesores/{id}:
 *   delete:
 *     summary: Eliminar un profesor
 *     tags: [Profesores]
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
 *         description: Profesor eliminado correctamente
 *       403:
 *         description: Requiere rol ADMIN
 *       404:
 *         description: Profesor no encontrado
 */
router.delete('/:id', verificarToken, verificarRol('ADMIN'), borrarProfesor)

export default router