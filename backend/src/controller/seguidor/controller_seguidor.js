/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de seguidor do BD.
 * Data: 28/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const seguidorDAO = require("../../model/DAO/seguidor-dao/seguidor.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

//Segue um determinado usuário
const segueUsuario = async (follow_up, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validaFollow = validarFollow(follow_up)

            if(!validaFollow) {

                resultFollow = await seguidorDAO.setInsertFollower(follow_up)

                if(resultFollow) {

                    if(resultFollow.length > 0) {

                        lastFollow = await seguidorDAO.getSelectLastFollow()

                        MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.follow    = lastFollow

                        return MESSAGES.DEFAULT_HEADER //201

                    } else {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validaFollow //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Deixa de seguir determinado usuário
const unfollowUsuario = async (unfollow, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validaUnfollow = validarFollow(unfollow)

            if(!validaUnfollow) {

                resultFollow = await seguidorDAO.setDeleteFollower(unfollow)

                if(resultFollow) {

                    if(resultFollow.length == 0) {

                        MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_DELETE.status
                        MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_DELETE.status_code
                        MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_DELETE.message
                        delete MESSAGES.DEFAULT_HEADER.items

                        return MESSAGES.DEFAULT_HEADER //200

                    } else {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validaFollow //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Valida dados do follow
const validarFollow = (follow) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(isNaN(follow.usuario_id) || follow.usuario_id == null || follow.usuario_id == undefined || follow.usuario_id == "") {

        MESSAGES.ERROR_REQUIRED_FIELDS += " [USUARIO ID]"
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (isNaN(follow.seguidor_id) || follow.seguidor_id == null || follow.seguidor_id == undefined || follow.seguidor_id == ""){
        MESSAGES.ERROR_REQUIRED_FIELDS += " [SEGUIDOR ID]"
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }

}

module.exports = {
    segueUsuario,
    unfollowUsuario
}