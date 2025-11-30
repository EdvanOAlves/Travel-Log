/**********************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da aplicação
 * Travel Log
 * Data: 20/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

//Responsável pelo funcionamento da API
const express           = require('express')

// Responsável pelas permissões da API
const cors              = require('cors')

// Import das dependências para a documentação dos EndPoints da API 
const swaggerUi         = require('swagger-ui-express')
const swaggerDocument   = require('./doc/index.js')

// Retorna a porta do servidor atual ou colocamos uma porta local
const PORT = process.PORT || 8000

// Criando instância da classe express
const app = express()

// Configuração de permissões de requisição
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')    // Servidor de origem
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Verbos permitidos

    // Carrega as configurações no CORS da API
    app.use(cors())
    next() // Próximo, carregar os próximos EndPoints 
})

//Import da rota
const usuarioRoutes = require("./src/routes/usuario_routes.js")

//EndPoints
app.use('/v1/travellog', usuarioRoutes)

//EndPoint da documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
    console.log("Está vivo...!!!")
})