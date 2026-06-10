// authService.js - Lógica de negocio de autenticación


import jwt      from 'jsonwebtoken'
import bcrypt   from 'bcryptjs'
import Usuario  from '../models/Usuario.js'
import Sesion   from '../models/Sesion.js'

export async function loginService({ email, password }) {
  // 1. Buscar el usuario en MongoDB
  const usuario = await Usuario
  .findOne({ email })
  .select('+passwordHash')
  if (!usuario) throw new Error('Email o contraseña incorrectos')

  // 2. Verificar la contraseña
  const passwordValida = await bcrypt.compare(password, usuario.passwordHash)
  if (!passwordValida) throw new Error('Email o contraseña incorrectos')

  // 3. Generar el JWT
  // El token incluye solo lo necesario - nunca datos sensibles
  const token = jwt.sign(
    {
      id:     usuario._id,
      email:  usuario.email,
      nombre: usuario.nombre,
      rol:    usuario.rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  )

  // 4. Guardar la sesión en MongoDB para poder invalidarla después
  await Sesion.create({ usuarioId: usuario._id, token })

  return {
    token,
    usuario: {
      id:     usuario._id,
      email:  usuario.email,
      nombre: usuario.nombre,
      rol:    usuario.rol,
    }
  }
}

export async function logoutService(token) {
  // Invalida la sesión en MongoDB
  await Sesion.updateOne({ token }, { activa: false })
}