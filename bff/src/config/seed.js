import dotenv   from 'dotenv'
import bcrypt   from 'bcryptjs'
import mongoose from 'mongoose'
import Usuario  from '../models/Usuario.js'

dotenv.config({ path: '../../.env' })

async function seed() {
  await mongoose.connect('mongodb://localhost:27017/club-sjo')

  // Limpia usuarios existentes
  await Usuario.deleteMany({})

  const usuarios = [
    {
      email:        'admin@sanjoseobrero.ar',
      passwordHash: await bcrypt.hash('admin123', 10),
      nombre:       'Admin Club',
      rol:          'ADMIN',
    },
    {
      email:        'profesor@sanjoseobrero.ar',
      passwordHash: await bcrypt.hash('profesor123', 10),
      nombre:       'Ricardo Sosa',
      rol:          'PROFESOR',
    },
  ]

  await Usuario.insertMany(usuarios)
  console.log('Usuarios creados correctamente')
  process.exit(0)
}

seed().catch(err => {
  console.error('Error en seed:', err)
  process.exit(1)
})