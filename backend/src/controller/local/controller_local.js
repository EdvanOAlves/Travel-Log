/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de local do BD.
 * Data: 06/12/2025
 * Developer: Edvan
 * Versão: 1.0.0
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const localDAO = require("../../model/DAO/local-dao/local.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

//Buscar locais visitados pelo id de usuário
const buscarLocaisVisitadosUsuarioId = async (user_id) => {
    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Verificando se é um id válido
        if (isNaN(user_id) || user_id <= 0 || user_id == undefined || user_id == null || user_id == "") {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

        // realizando requisição no model
        resultLocal = await localDAO.getSelectLocationsByUserId(user_id);

        // length 1 é a mensagem de notfound
        if (resultLocal.length == 1 && resultLocal.includes("ERRO_404")){
            return MESSAGES.ERROR_NOT_FOUND //404;
        }

        // length 0 é porque o model não retornou nada (Por erro)
        else if (resultLocal.length == 0) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

        // Unico caso que resta, o que deu tudo certo
        else {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.items.locais = resultLocal
            return MESSAGES.DEFAULT_HEADER //200
        }
    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Buscar paises visitados pelo id de usuário 
// (Poderia ser uma model e controller de países, mas é só uma função que vai envolver eles, países nesse caso é mais um atributo de local)
const buscarPaisesVisitadosUsuarioId = async (user_id) => {
    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Verificando se é um id válido
        if (isNaN(user_id) || user_id <= 0 || user_id == undefined || user_id == null || user_id == "") {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

        // realizando requisição no model
        resultPais = await localDAO.getSelectCountriesByUserId(user_id);

        // length 1 é a mensagem de notfound
        if (resultPais.length == 1 && resultPais.includes("ERRO_404")){
            return MESSAGES.ERROR_NOT_FOUND //404;
        }

        // length 0 é porque o model não retornou nada (Por erro)
        else if (resultPais.length == 0) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

        // Unico caso que resta, o que deu tudo certo
        else {
            MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
            MESSAGES.DEFAULT_HEADER.items.paises = resultPais
            return MESSAGES.DEFAULT_HEADER //200
        }
    } catch (error) {
        console.log(error);
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


module.exports = {
    buscarLocaisVisitadosUsuarioId,
    buscarPaisesVisitadosUsuarioId
}