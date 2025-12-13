/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de local do BD.
 * Data: 06/12/2025
 * Developer: Edvan
 * Versão: 1.0.0
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const { PrismaClientValidationError } = require("../../generated/prisma/runtime/library.js")
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

const buscarLocalId = async (local_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if(!isNaN(local_id) && local_id != '' && local_id != null && local_id != undefined && local_id > 0) {

            resultLocal = await localDAO.getSelectLocalById(local_id)

            if(resultLocal) {

                if(resultLocal.length > 0) {
                    
                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items       = resultLocal

                    return MESSAGES.DEFAULT_HEADER

                } else {
                    return MESSAGES.ERROR_NOT_FOUND
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const insereLocal = async (local, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validar = validaLocal(local)

            if(!validar) {

                resultLocal = await localDAO.setInsertLocal(local)
                
                if(resultLocal) {

                    lastLocal = await localDAO.getSelectLastLocal()

                    MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.local     = lastLocal

                    return MESSAGES.DEFAULT_HEADER //201

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validar //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const deletaLocal = async (local_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        validarId = await buscarLocalId(local_id)

        if (validarId.status_code == 200) {

            resultLocal = await localDAO.setDeleteLocal(local_id)

            if(resultLocal) {

                MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SECCESS_DELETE.message
                delete MESSAGES.DEFAULT_HEADER.items

                return MESSAGES.DEFAULT_HEADER

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
            }

        } else {
            return validarId
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}


const validaLocal = (local) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (local.nome_local == null || !isNaN(local.nome_local) || local.nome_local == "" || local.nome_local == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS += ' [NOME LOCAL INVALIDO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (local.estado == null || !isNaN(local.estado) || local.estado == "" || local.estado == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS += ' [ESTADO INVALIDO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if (local.cidade == null || !isNaN(local.cidade) || local.cidade == "" || local.cidade == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS += ' [CIDADE INVALIDO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else if(isNaN(local.pais_id) || local.pais_id == "" || local.pais_id == undefined || local.pais_id == null) {
        MESSAGES.ERROR_REQUIRED_FIELDS += ' [PAIS ID INVALIDO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false 
    }

}


module.exports = {
    buscarLocaisVisitadosUsuarioId,
    buscarPaisesVisitadosUsuarioId,
    buscarLocalId,
    deletaLocal,
    insereLocal
}