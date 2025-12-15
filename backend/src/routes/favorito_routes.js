/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller de favoritos
 * Data: 14/12/2025
 * Developer: Edvan Alves
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerFavorito = require('../controller/favorito/controller_favorito.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json()

router.post('/favorite/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody     = req.body
    const contentType   = req.headers['content-type']

    const favorito = await controllerFavorito.alternaFavorito(dadosBody, contentType)

    res.status(favorito.status_code)
    res.json(favorito)

})

module.exports = router