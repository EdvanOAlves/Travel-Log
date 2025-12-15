/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de favorito do BD.
 * Data: 07/12/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const favoritoDAO = require("../../model/DAO/favorito-dao/favorito.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

const alternaFavorito = async (favorito, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        
    try {
        
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validar = validarFavorito(favorito)
            
            if(!validar) {
    
                resultFavorito = await favoritoDAO.setToggleFavoriteLog(favorito)

                if(resultFavorito) {
                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_UPDATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message             = MESSAGES.SUCCESS_UPDATE_ITEM.message
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

const deletaRelacoesFavorito = async (log_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if(!isNaN(log_id) && log_id != "" && log_id != undefined && log_id != null && log_id > 0) {

            resultFavorito = await favoritoDAO.deleteAllRelationFavorite(log_id)

            if(resultFavorito) {

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

const validarFavorito = (favorito) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    if (favorito.log_id == null || favorito.log_id == undefined || favorito.log_id == "" || isNaN(favorito.log_id)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [LOG ID INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (favorito.usuario_id == null || favorito.usuario_id == undefined || favorito.usuario_id == "" || isNaN(favorito.usuario_id)) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [USUARIO ID INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

module.exports = {
    alternaFavorito,
    deletaRelacoesFavorito
}