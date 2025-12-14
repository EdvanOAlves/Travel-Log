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

const bodyParserJSON = bodyParser.json();


router.get('/comment/:id', cors(), async function (req, res) {
    
   const idLog = req.params.id

   let comentario = await controllerComentario.buscarComentariosLogId(idLog)

   res.status(comentario.status_code)
   res.json(comentario)
    
 })
 
//Insere um novo comentario
router.post('/comment/', cors(), bodyParserJSON, async function (request, response) {
   
  //Recebe os dados do body da requisição (Obrigatório no endpoint quando utilizando o bodyParser)
  let dadosBody = request.body;

  //Recebe o tipo de dados da requisição (JSON, XML, etc)
  let contentType = request.headers['content-type']

  //Chama a função da controller para publicar o novo comentário, encaminhando o conteúdo, autor e destino
  let comentario = await controllerComentario.insereComentario(dadosBody, contentType);
  response.status(comentario.status_code);
  response.json(comentario);

})
 
// Desativar um comentário
router.put('/comment/:id', cors(), bodyParserJSON, async function (request, response) {
  
  //Recebe o ID do comentario
  let idComentario = request.params.id
 
  //Chamando função para atualizar o filme, encaminhando os dados, id e content type
  let comentario = await controllerComentario.desativaComentario(idComentario)
 
  response.status(comentario.status_code)
  response.json(comentario)
  
})


module.exports = router