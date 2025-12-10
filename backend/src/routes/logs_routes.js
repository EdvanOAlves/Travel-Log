/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller dos logs
 * Data: 09/12/2025
 * Developer: Gabriel Lacerda
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerLog = require('../controller/log/controller_log')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json()

//Buscar Feed Seguindo
router.get('/log/following/:id', cors(), async (req, res) => {
    const userId = req.params.id
    const filtros = {
        data_inicio: req.query.data_inicio,
        data_fim: req.query.data_fim,
        local_pais: req.query.local_pais,
        local_estado: req.query.local_estado,
        local_cidade: req.query.local_cidade,
        nome_local: req.query.nome_local,
        tipo_viagem_id: req.query.tipo_viagem_id
    }


    // Chama a função para buscar o conteudo
    const logs = await controllerLog.listarFeedSeguindo(userId, filtros)

    res.status(logs.status_code)
    res.json(logs)

})

//Buscar Feed Recentes
router.get('/log/explore/:id', cors(), async (req, res) => {
    const userId = req.params.id
    const filtros = {
        data_inicio: req.query.data_inicio,
        data_fim: req.query.data_fim,
        local_pais: req.query.local_pais,
        local_estado: req.query.local_estado,
        local_cidade: req.query.local_cidade,
        nome_local: req.query.nome_local,
        tipo_viagem_id: req.query.tipo_viagem_id
    }


    // Chama a função para buscar o conteudo
    const logs = await controllerLog.buscarLogsFeed(userId, filtros)

    res.status(logs.status_code)
    res.json(logs)

})

//Insere log
router.post('/log/', cors(), bodyParserJSON, async (req, res) => {

    const contentType = req.headers['content-type']
    const dadosBody   = req.body

    const log = await controllerLog.insereLog(dadosBody, contentType)

    res.status(log.status_code)
    res.json(log)

})

//Atualiza log
router.put('/log/', cors(), bodyParserJSON, async (req, res) => {

    const contentType = req.headers['content-type']
    const dadosBody   = req.body
    const log_id      = req.query.log_id

    const log = await controllerLog.atualizaLog(log_id, dadosBody, contentType)

    res.status(log.status_code)
    res.json(log)

})

//Deleta log
router.delete('/log/', cors(), bodyParserJSON, async (req, res) => {

    const log_id = req.query.log_id

    const log = await controllerLog.deletaLog(log_id)

    res.status(log.status_code)
    res.json(log)

})

module.exports = router
