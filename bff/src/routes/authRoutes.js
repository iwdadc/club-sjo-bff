// authRoutes.js - Rutas de autenticación

import { Router }        from 'express'
import { login, logout, verificarSesion } from '../controllers/authController.js'
import { verificarToken }                 from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/login',    login)
router.post('/logout',   verificarToken, logout)
router.get('/verificar', verificarToken, verificarSesion)

export default router