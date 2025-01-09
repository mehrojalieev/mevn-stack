const swaggerUi = require("swagger-ui-express")
const swaggerjsDoc = require("swagger-jsdoc")

const swaggerOptions = {
        definition: {
         openapi: '3.0.0',
         info: {
                 title: "Mevn Service",
                 version: '1.0.0',
                 description: 'Mevn Project Api Documention',
                 contact: {
                         name: 'Developer'
                 },
                 servers: [
                        { url: 'http://localhost:4545' },
                        { url: 'https://mevn-stack-15sj.onrender.com' }
                    ],
                    components: {
                        securitySchemas:{
                            bearerAuth: {
                                type: 'https',
                                scheme: 'bearer',
                                bearerFormat: 'JWT'
                            }
                        },
                        security:[
                            {
                                bearerAuth: []
                            }
                        ]
                        },
                        schemas: {
                            User: {
                                type: 'object',
                                properties: {
                                    _id: { type: 'string' },
                                    firstname: { type: 'string' },
                                    larstname: { type: 'string' },
                                    email: { type: 'string' },
                                    role: { type: 'string' },
                                },
                            },
                        },
                    },         
         },
 apis: ['./swagger/*.js']
}

const swaggerDocs = swaggerjsDoc(swaggerOptions)

module.exports = {swaggerUi, swaggerDocs}