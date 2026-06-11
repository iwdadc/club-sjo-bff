import { Router }       from 'express'
import { listarProfesores, nuevoProfesor, modificarProfesor, borrarProfesor } from '../controllers/profesorController.js'
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/',     verificarToken, listarProfesores)
router.post('/',    verificarToken, verificarRol('ADMIN'), nuevoProfesor)
router.put('/:id',  verificarToken, verificarRol('ADMIN'), modificarProfesor)
router.delete('/:id', verificarToken, verificarRol('ADMIN'), borrarProfesor)

export default router