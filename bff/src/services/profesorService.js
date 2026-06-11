// profesorService.js - Lógica de negocio para profesores

import CacheInscripcion from '../models/CacheInscripcion.js'
import Usuario          from '../models/Usuario.js'
import bcrypt           from 'bcryptjs'

export async function getProfesores() {
  const clave = 'profesores:todos'
  const cache = await CacheInscripcion.findOne({ clave })
  if (cache) {
    console.log('📦 Profesores desde caché')
    return cache.datos
  }

  // TODO: await axios.get(`${process.env.BACKEND_URL}/api/profesores`)
  // Por ahora trae los usuarios con rol PROFESOR de MongoDB
  const profesores = await Usuario.find({ rol: 'PROFESOR' }).select('-passwordHash')
  await CacheInscripcion.create({ clave, datos: profesores })
  return profesores
}

export async function crearProfesor(datos) {
  const { nombre, email, password, actividad, sede } = datos

  // Crea el usuario en MongoDB para que pueda loguearse
  const passwordHash = await bcrypt.hash(password, 10)
  const usuario = await Usuario.create({
    nombre,
    email,
    passwordHash,
    rol: 'PROFESOR',
  })

  // TODO: también crear en backend Java con actividad y sede asignadas
  // await axios.post(`${process.env.BACKEND_URL}/api/profesores`, { nombre, email, actividad, sede })

  // Invalida caché
  await CacheInscripcion.deleteOne({ clave: 'profesores:todos' })

  return { ok: true, id: usuario._id, nombre, email, actividad, sede }
}

export async function editarProfesor(id, datos) {
  const update = { nombre: datos.nombre, email: datos.email }

  // Si viene nueva contraseña la hashea
  if (datos.password) {
    update.passwordHash = await bcrypt.hash(datos.password, 10)
  }

  await Usuario.findByIdAndUpdate(id, update)


  await CacheInscripcion.deleteOne({ clave: 'profesores:todos' })
  return { ok: true, id }
}

export async function eliminarProfesor(id) {
  await Usuario.findByIdAndDelete(id)


  await CacheInscripcion.deleteOne({ clave: 'profesores:todos' })
  return { ok: true }
}