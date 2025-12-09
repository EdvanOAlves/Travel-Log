/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de midia do BD.
 * Data: 08/12/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const midiaDAO = require("../../model/DAO/midia-dao/midia.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

//Retorna todas as midias de determinado log
const listarMidiasLogId = async (log_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
            
    try {
        
        if (!isNaN(log_id) && log_id != '' && log_id != null && log_id != undefined && log_id > 0) {

            resultMidia = await midiaDAO.getSelectMediasByLogId(log_id)

            if (resultMidia) {

                if (resultMidia.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.midias        = resultMidia

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Retorna uma midia pelo id
const buscarMidiaId = async (midia_id) => {
    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        
        if (!isNaN(log_id) && log_id != '' && log_id != null && log_id != undefined && log_id > 0) {
        
            resultMidia = await midiaDAO.getSelectMediaById(id)

            if (resultMidia) {

                if (resultMidia.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.midia     = resultMidia

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Registra o caminho de uma midia no banco
const insereMidia = async (midia, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        
    try {
        
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validar = validarMidia(midia)

            if(!validar) {
    
                resultMidia = await midiaDAO.setInsertMedia(midia)

                if(resultMidia) {

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message             = MESSAGES.SUCCESS_CREATED_ITEM.message
                    delete MESSAGES.DEFAULT_HEADER

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

// Deleta um registro de midia
const deletaMidia = async (midia_id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        
        let validarId = await buscarMidiaId(midia_id)

        if (validarId.status_code == 200) {

            let resultMidia = await midiaDAO.setDeleteMedia(midia_id)

            if (resultMidia) {

                MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_DELETE.message
                delete MESSAGES.DEFAULT_HEADER.items

                return MESSAGES.DEFAULT_HEADER // 200

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            return validarId // (400, 404, 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

const validarMidia = (midia) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    if (midia.indice == null || midia.indice == undefined || midia.indice == "" || typeof midia.indice !== "number") {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [INDICE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (midia.log_id == null || midia.log_id == undefined || midia.log_id == "" || typeof midia.log_id !== "number") {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [LOG ID INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (midia.link == null || midia.link == undefined || midia.link == "" || typeof midia.link !== "string" || midia.link.length > 1500) {
    
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [LINK INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
            
    } else {
        return false
    }

}

module.exports = {

    listarMidiasLogId,
    buscarMidiaId,
    insereMidia,
    deletaMidia

}