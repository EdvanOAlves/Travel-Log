/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller dos logs
 * Data: 09/12/2025
 * Developer: Gabriel Lacerda
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerViagem = require('../controller/viagem/controller_viagem.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json()

router.get('/travel/:id', cors(), async (req, res) => {

    const id = req.params.id

    const viagem = await controllerViagem.buscarViagemUsuarioId(id)

    res.status(viagem.status_code)
    res.json(viagem)

})

// Registra uma viagem
router.post("/travel", cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    viagem = await controllerViagem.insereViagem(dadosBody, contentType)
    console.log(viagem)
    res.status(viagem.status_code)
    res.json(viagem)

})

//Atualiza uma viagem
router.put("/travel", cors(), bodyParserJSON, async (req, res) => {

    const viagemId = req.query.travel_id    
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    viagem = await controllerViagem.atualizaViagem(viagemId, dadosBody, contentType)

    res.status(viagem.status_code)
    res.json(viagem)

})

//Deleta uma viagem
router.delete("/travel", cors(), async (req, res) => {

    const viagemId = req.query.travel_id

    viagem = await controllerViagem.deletaViagem(viagemId)

    res.status(viagem.status_code)
    res.json(viagem)

})

module.exports = router