import { getAlumnos, getAlumnoPorId, actualizarAlumno } from '../services/alumnoService.js'

export async function listarAlumnos(req, res) {
  try {
    const datos = await getAlumnos()
    res.json(datos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function obtenerAlumno(req, res) {
  try {
    const alumno = await getAlumnoPorId(req.params.id)
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' })
    res.json(alumno)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function editarAlumno(req, res) {
  try {
    const resultado = await actualizarAlumno(req.params.id, req.body)
    res.json(resultado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}