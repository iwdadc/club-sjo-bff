// authController.js - Controlador de autenticación

import { loginService, logoutService } from '../services/authService.js'

export async function login(req, res) {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios' })
        }

        const resultado = await loginService({ email, password })
        res.json(resultado)

    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export async function logout(req, res) {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(400).json({ error: 'Token no proporcionado' })

        await logoutService(token)
        res.json({ mensaje: 'Sesión cerrada correctamente' })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export async function verificarSesion(req, res) {
  // El middleware ya verificó el token si llega acá es válido
  res.json({ usuario: req.usuario })
}
