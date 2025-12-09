/**********************************************************************
 * Objetivo: Arquivo responsável pelo direcionamento de dados para a 
 * controller dos comentários
 * Data: 09/12/2025
 * Developer: Edvan Alves
 * Versão: 1.0.0
 *********************************************************************/

//Import das dependências
const express = require('express');        // Responsável pela API
const router = express.Router();

const cors = require('cors');              // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser');  // Responsável por gerenciar a chegada dos dados da API com o front


const controllerComentario = require('../controller/comentario/controller_comentario');

//Criando objeto especialista no formato JSON para recebimento de dados via POST e PUT
const bodyParserJSON = bodyParser.json();

// *********
// ENDPOINTS
// *********

// Para buscar comentários em um log
router.get('/comment/fromlog/', cors(), async function (request, response) {
    // Recebe o ID encaminhado via parametro na requisição
    const idLog = request.query.log_id;
 
    // Chamando a função para realizar a consulta no DB
    let comentario = await controllerComentario.buscarComentariosLogId(idLog);
    response.status = comentario.status_code;
    response.json(comentario);
 })
 
 // Chama a função para buscar um comentário por id (Usado apenas em debug, o front não precisa disso)
 router.get('/comment/fromComment/', cors(), async function (request, response) {
        // Recebe o ID encaminhado via parametro na requisição
        const idLog = request.query.id;
 
        // Chamando a função para realizar a consulta no DB
        let comentario = await controllerComentario.buscarComentarioId(id);
        response.status = comentario.status_code;
        response.json(comentario);

 })
 //Boa prática: Quando passamos primary Key é interessante colocar essa PK como parâmetro, itens de filtro são parâmetros de rota mesmo
 
 //Insere um novo comentario
 router.post('/comment/', cors(), bodyParserJSON, async function (request, response) {
    console.log('recebi algorrr')
    //Recebe os dados do body da requisição (Obrigatório no endpoint quando utilizando o bodyParser)
    let dadosBody = request.body;
 
    //Recebe o tipo de dados da requisição (JSON, XML, etc)
    let contentType = request.headers['content-type']
 
    //Chama a função da controller para publicar o novo comentário, encaminhando o conteúdo, autor e destino
    let comentario = await controllerComentario.inserirComentario(dadosBody, contentType);
    response.status(comentario.status_code);
    response.json(comentario);
 })
 
 // Desativar um comentário (nosso delete)
 router.put('/comment/:id', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o ID do comentario
    let idComentario = request.params.id;
 
    //Chamando função para atualizar o filme, encaminhando os dados, id e content type
    let comentario = await controllerComentario.desativaComentario(idComentario);
 
    response.status(comentario.status_code);
    response.json(comentario);
 })


module.exports = router