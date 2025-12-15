/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de comentario do BD.
 * Data: 07/12/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const curtidaDAO = require("../../model/DAO/like-dao/like.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

const alternaCurtida = async (curtida, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            const validar = validarCurtida(curtida)

            if (!validar) {
                resultCurtida = await curtidaDAO.setToggleLikeLog(curtida)

                if (resultCurtida) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATE_ITEM.message
                    delete MESSAGES.DEFAULT_HEADER.items

                    return MESSAGES.DEFAULT_HEADER //200

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

// Para conferir a situação de interação com aquele log(curtida/favorito)
const consultarInteracoesLog = async (usuario_id, log_id) => {
    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        curtida = {
            usuario_id: usuario_id,
            log_id: log_id
        }

        const validar = validarCurtida(curtida)
        if (validar) {
            return validar //400
        }
        resultInteracoes = await curtidaDAO.getSelectInteractions(curtida)
        if (!resultInteracoes) {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
        if (resultInteracoes.length == 0) {
            return MESSAGES.ERROR_NOT_FOUND //404

        }
        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
        MESSAGES.DEFAULT_HEADER.items.interacoes = resultInteracoes

        return MESSAGES.DEFAULT_HEADER //200

    }
    catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

const deletaRelacoesCurtida = async (log_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if(!isNaN(log_id) && log_id != "" && log_id != undefined && log_id != null && log_id > 0) {

            resultCurtida = await curtidaDAO.deleteAllRelationLike(log_id)
            
            if(resultCurtida) {

                MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETE.message
                delete MESSAGES.DEFAULT_HEADER.items

                return MESSAGES.DEFAULT_HEADER

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

const validarCurtida = (curtida) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    if (curtida.log_id == null || curtida.log_id == undefined || curtida.log_id == "" || isNaN(curtida.log_id)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [LOG ID INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (curtida.usuario_id == null || curtida.usuario_id == undefined || curtida.usuario_id == "" || isNaN(curtida.usuario_id)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [USUARIO ID INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

module.exports = {
    alternaCurtida,
    consultarInteracoesLog,
    deletaRelacoesCurtida
}