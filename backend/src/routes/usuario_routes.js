/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller dos usuários
 * Data: 29/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const express = require('express')
const router = express.Router()
const controllerUsuario = require('../controller/usuario/controller_usuario.js')

const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front

const bodyParserJSON = bodyParser.json()

router.get('/user/', cors(), async (req, res) => {

    const usuario = await controllerUsuario.listarUsuarios()

    res.status(usuario.status_code)
    res.json(usuario)

})

router.get('/user/profile/:id', cors(), async (req, res) => {
    const user_id = req.params.id
    const perfil_id = req.query.perfil_id
    const filtros = {
        data_inicio: req.query.data_inicio,
        data_fim: req.query.data_fim,
        local_pais: req.query.local_pais,
        local_estado: req.query.local_estado,
        local_cidade: req.query.local_cidade,
        nome_local: req.query.nome_local,
        tipo_viagem_id: req.query.tipo_viagem_id
    }

    const usuario = await controllerUsuario.buscarUsuarioPerfilId(perfil_id, user_id, filtros)

    res.status(usuario.status_code)
    res.json(usuario)
})

router.get('/user/:id', cors(), async (req, res) => {

    const id = req.params.id

    const usuario = await controllerUsuario.buscarUsuarioId(id)

    res.status(usuario.status_code)
    res.json(usuario)

})

router.post('/user/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody   = req.body
    const contentType = req.headers['content-type']

    const usuario = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    res.status(usuario.status_code)
    res.json(usuario)

})

router.put('/user/:id', cors(), bodyParserJSON, async (req, res) => {

    const id = req.params.id
    const dadosBody = req.body
    const contentType = req.headers['content-type']

    const usuario = await controllerUsuario.atualizarUsuario(id, dadosBody, contentType)

    res.status(usuario.status_code)
    res.json(usuario)

})

router.put('/user/', cors(), bodyParserJSON, async (req, res) => {

    const dadosBody = req.body
    const contentType = req.headers['content-type']

    const usuario = await controllerUsuario.altenarStatusUsuario(dadosBody, contentType)

    res.status(usuario.status_code)
    res.json(usuario)

})

module.exports = router