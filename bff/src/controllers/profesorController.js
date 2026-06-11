import { getProfesores, crearProfesor, editarProfesor, eliminarProfesor } from '../services/profesorService.js'

export async function listarProfesores(req, res) {
  try {
    const datos = await getProfesores()
    res.json(datos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function nuevoProfesor(req, res) {
  try {
    const resultado = await crearProfesor(req.body)
    res.status(201).json(resultado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function modificarProfesor(req, res) {
  try {
    const resultado = await editarProfesor(req.params.id, req.body)
    res.json(resultado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function borrarProfesor(req, res) {
  try {
    await eliminarProfesor(req.params.id)
    res.json({ ok: true, mensaje: 'Profesor eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}