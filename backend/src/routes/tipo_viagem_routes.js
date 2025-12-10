/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller dos tipos de viagens
 * Data: 10/12/2025
 * Developer: Edvan Alves
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerTipoViagem = require('../controller/tipo-viagem/controller_tipo_viagem.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json()

router.get('/traveltype/', cors(), async (req, res) => {

    const tipo_viagem = await controllerTipoViagem.listarTipos()

    res.status(tipo_viagem.status_code)
    res.json(tipo_viagem)

})


module.exports = router