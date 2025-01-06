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
                    ]
                    
         },

 },
 apis: ['./routes/*.js']
}

const swaggerDocs = swaggerjsDoc(swaggerOptions)

module.exports = {swaggerUi, swaggerDocs}