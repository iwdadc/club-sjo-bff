import CacheInscripcion from '../models/CacheInscripcion.js'

// ── MOCK temporal hasta conectar el backend Java ──
const INSCRIPCIONES_MOCK = [
    {
        id: 1,
        nombreAlumno:    "Lucas Rodríguez",
        dniAlumno:       "48.220.101",
        actividad:       "Natación",
        sede:            "Capilla San José Obrero",
        nombreAdulto:    "Ana Rodríguez",
        telefonoAdulto:  "11 3456-7890",
        fechaInscripcion:"20/05/2026",
        estado:          "CONFIRMADO",
    },
    {
        id: 2,
        nombreAlumno:    "Sofía Farías",
        dniAlumno:       "49.103.883",
        actividad:       "Folklore",
        sede:            "Capilla San José Obrero",
        nombreAdulto:    "Jorge Farías",
        telefonoAdulto:  "11 4567-8901",
        fechaInscripcion:"19/05/2026",
        estado:          "PENDIENTE",
    },
]

// Obtiene todas las inscripciones usando caché
export async function getInscripciones() {
  const clave = 'inscripciones:todas'

  // 1. Buscar en caché
  const cache = await CacheInscripcion.findOne({ clave })
  if (cache) {
    console.log('Inscripciones desde caché')
    return cache.datos
  }

  // 2. No está en caché → obtener del backend <Java></Java> (mock por ahora)
  console.log('Inscripciones desde mock (backend Java pendiente)')
  const datos = INSCRIPCIONES_MOCK

  // 3. Guardar en caché
  await CacheInscripcion.create({ clave, datos })

  return datos
}

// Crea una nueva inscripción
export async function crearInscripcion(datos) {
  console.log('Nueva inscripción recibida:', datos.nombreApellido)

  // Invalida el caché para que la próxima consulta traiga datos frescos
  await CacheInscripcion.deleteOne({ clave: 'inscripciones:todas' })

  return { ok: true, mensaje: 'Inscripción recibida correctamente' }
}

// Actualiza el estado de una inscripción
export async function actualizarEstado(id, estado) {
  // TODO: reemplazar por → await axios.patch(`${process.env.BACKEND_URL}/api/inscripciones/${id}`, { estado })
  console.log(`Actualizando estado inscripción ${id} → ${estado}`)

  // Invalida el caché
  await CacheInscripcion.deleteOne({ clave: 'inscripciones:todas' })

  return { ok: true, id, estado }
}