// alumnoService.js — Lógica de negocio para alumnos

import CacheInscripcion from '../models/CacheInscripcion.js'

const ALUMNOS_MOCK = [
  {
    id: 1,
    nombreApellido:  "Lucas Rodríguez",
    dni:             "48.220.101",
    fechaNacimiento: "15/03/2010",
    edad:            16,
    genero:          "Masculino",
    domicilio:       "Av. San Martín 1234",
    actividades:     ["Natación"],
    sede:            "Capilla San José Obrero",
    estado:          "CONFIRMADO",
    nombreAdulto:    "Ana Rodríguez",
    telefonoAdulto:  "11 3456-7890",
    obraSocial:      "OSDE",
  },
  {
    id: 2,
    nombreApellido:  "Sofía Farías",
    dni:             "49.103.883",
    fechaNacimiento: "03/09/2009",
    edad:            16,
    genero:          "Femenino",
    domicilio:       "Calle Rivadavia 890",
    actividades:     ["Folklore"],
    sede:            "Capilla San José Obrero",
    estado:          "PENDIENTE",
    nombreAdulto:    "Jorge Farías",
    telefonoAdulto:  "11 4567-8901",
    obraSocial:      "No",
  },
]

export async function getAlumnos() {
  const clave = 'alumnos:todos'
  const cache = await CacheInscripcion.findOne({ clave })
  if (cache) {
    console.log('Alumnos desde caché')
    return cache.datos
  }

  // TODO: await axios.get(`${process.env.BACKEND_URL}/api/alumnos`)
  console.log('Alumnos desde mock')
  const datos = ALUMNOS_MOCK
  await CacheInscripcion.create({ clave, datos })
  return datos
}

export async function getAlumnoPorId(id) {
  const clave = `alumnos:${id}`
  const cache = await CacheInscripcion.findOne({ clave })
  if (cache) {
    console.log(` Alumno ${id} desde caché`)
    return cache.datos
  }

  // TODO: await axios.get(`${process.env.BACKEND_URL}/api/alumnos/${id}`)
  const datos = ALUMNOS_MOCK.find(a => a.id === parseInt(id)) || null
  if (datos) await CacheInscripcion.create({ clave, datos })
  return datos
}

export async function actualizarAlumno(id, datosNuevos) {
  // TODO: await axios.put(`${process.env.BACKEND_URL}/api/alumnos/${id}`, datosNuevos)
  console.log(` Actualizando alumno ${id}`)

  // Invalida caché del alumno y de la lista
  await CacheInscripcion.deleteMany({
    clave: { $in: [`alumnos:${id}`, 'alumnos:todos'] }
  })

  return { ok: true, id, ...datosNuevos }
}