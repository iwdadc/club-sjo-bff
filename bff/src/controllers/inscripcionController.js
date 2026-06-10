// inscripcionController.js - Controlador de inscripciones

import {getInscripciones, crearInscripcion, actualizarEstado} from '../services/inscripcionService.js'

export async function listarInscripciones(req, res) {
  try {
    const datos = await getInscripciones()
    res.json(datos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function nuevaInscripcion(req, res) {
  try {
    const resultado = await crearInscripcion(req.body)
    res.status(201).json(resultado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export async function cambiarEstado(req, res) {
  try {
    const { id }     = req.params
    const { estado } = req.body

    if (!estado) {
      return res.status(400).json({ error: 'El estado es obligatorio' })
    }

    const resultado = await actualizarEstado(id, estado)
    res.json(resultado)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}