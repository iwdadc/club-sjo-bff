// alumnoRoutes.js  

import { Router }          from 'express'
import { listarAlumnos, obtenerAlumno, editarAlumno } from '../controllers/alumnoController.js'
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/',     verificarToken, listarAlumnos)
router.get('/:id',  verificarToken, obtenerAlumno)
router.put('/:id',  verificarToken, verificarRol('ADMIN'), editarAlumno)

export default router