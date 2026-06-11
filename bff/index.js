// index.js - Punto de entrada del BFF

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './src/config/swagger.js'
import { conectarDB } from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import inscripcionRoutes from './src/routes/inscripcionRoutes.js'
import alumnoRoutes from './src/routes/alumnoRoutes.js'
import profesorRoutes from './src/routes/profesorRoutes.js'
dotenv.config()

const app  = express()
const PORT = process.env.PORT || 3000

// Middlewares globales
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/inscripciones', inscripcionRoutes)
app.use('/api/alumnos', alumnoRoutes)
app.use('./api/profesores', profesorRoutes)

// Ruta de health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', servicio: 'BFF Club San José Obrero' })
})

// Conectar DB e iniciar servidor
conectarDB().then(() => {
    app.listen(PORT, () => {
        console.log(`BFF corriendo en http://localhost:${PORT}`)
    })
})
