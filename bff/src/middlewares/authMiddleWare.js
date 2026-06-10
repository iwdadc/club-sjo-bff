// authMiddleware.js - Middleware de validación de JWT


import jwt    from 'jsonwebtoken'
import Sesion from '../models/Sesion.js'

export async function verificarToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token no proporcionado' })
    }

    const token = authHeader.split(' ')[1]

    // 1. Verificar que el JWT sea válido
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // 2. Verificar que la sesión esté activa en MongoDB
    const sesion = await Sesion.findOne({ token, activa: true })
    if (!sesion) {
      return res.status(401).json({ error: 'Sesión inválida o expirada' })
    }

    // 3. Adjuntar el usuario al request para los controllers
    req.usuario = payload
    next()

  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
  }
}

export function verificarRol(...roles) {
  // Factory de middleware — verifica que el usuario tenga el rol requerido
  // Principio DRY: un solo middleware para todos los roles
  return (req, res, next) => {
    if (!roles.includes(req.usuario?.rol)) {
      return res.status(403).json({ error: 'No tenés permiso para este recurso' })
    }
    next()
  }
}