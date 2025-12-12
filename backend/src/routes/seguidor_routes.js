/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller dos seguidores
 * Data: 29/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerSeguidor = require('../controller/seguidor/controller_seguidor.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json()

router.get('/following/:id', cors(), async (req, res) =>{
    const userId = req.params.id
    const seguidor = await controllerSeguidor.buscarSeguindo(userId)

    res.status(seguidor.status_code)
    res.json(seguidor)
})

router.post('/follow/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody     = req.body
    const contentType   = req.headers['content-type']

    const seguidor = await controllerSeguidor.insereSeguidor(dadosBody, contentType)

    res.status(seguidor.status_code)
    res.json(seguidor)

})

router.delete('/follow', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody     = req.body
    const contentType   = req.headers['content-type']

    const seguidor = await controllerSeguidor.deletaSeguidor(dadosBody, contentType)

    res.status(seguidor.status_code)
    res.json(seguidor) 

})

module.exports = router