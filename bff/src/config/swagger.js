// swagger.js - Configuración de Swagger para documentación de la API

import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title:       'Club San José Obrero — BFF API',
      version:     '1.0.0',
      description: 'API del BFF que actúa como orquestador entre el frontend React y el backend Java',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor local' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type:         'http',
          scheme:       'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js'], // Lee los comentarios JSDoc de las rutas
}

export default swaggerJsdoc(options)
