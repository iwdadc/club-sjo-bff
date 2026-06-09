// index.js - Punto de entrada del BFF

import express    from 'express'
import cors       from 'cors'
import morgan     from 'morgan'
import dotenv     from 'dotenv'
import { conectarDB } from './src/config/db.js'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 3000

// Middlewares globales
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(morgan('dev'))

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
