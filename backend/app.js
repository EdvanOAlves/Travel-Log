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
const PORT = process.env.PORT || 8080

// Criando instância da classe express
const app = express()

// Configuração de permissões de requisição
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// Middleware para permitir JSON no body
app.use(express.json());

//Import das rotas
const comentarioRoutes  = require("./src/routes/comentario_routes.js")
const curtidaRoutes     = require("./src/routes/curtida_routes.js")
const favoritoRoutes    = require("./src/routes/favorito_routes.js")
const logsRoutes        = require("./src/routes/logs_routes")
const usuarioRoutes     = require("./src/routes/usuario_routes.js")
const seguidorRoutes    = require("./src/routes/seguidor_routes.js")
const tipoViagemRoutes  = require("./src/routes/tipo_viagem_routes.js")
const viagemRoutes      = require("./src/routes/viagem_routes.js")

//EndPoints
app.use('/v1/travellog', comentarioRoutes)
app.use('/v1/travellog', curtidaRoutes)
app.use('/v1/travellog', favoritoRoutes)
app.use('/v1/travellog', logsRoutes)
app.use('/v1/travellog', usuarioRoutes)
app.use('/v1/travellog', seguidorRoutes)
app.use('/v1/travellog', tipoViagemRoutes)
app.use('/v1/travellog', viagemRoutes)


//EndPoint da documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(PORT, () => {
    console.log("Está vivo...!!!")
})
