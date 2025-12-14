/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller de curtidas
 * Data: 14/12/2025
 * Developer: Edvan Alves
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerCurtida = require('../controller/curtida/controller_curtida.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json()

router.post('/like/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody     = req.body
    const contentType   = req.headers['content-type']

    const curtida = await controllerCurtida.alternaCurtida(dadosBody, contentType)

    res.status(curtida.status_code)
    res.json(curtida)

})

//Buscar Dados de interação (Curtidas e favoritos de um log)
router.get('/interacoes/:id', cors(), async (req, res) => {
    const userId = req.params.id
    const logId = req.query.log_id

    // Chama a função para buscar o conteudo
    const interacao = await controllerCurtida.consultarInteracoesLog(userId, logId)

    res.status(interacao.status_code)
    res.json(interacao)
})


module.exports = router