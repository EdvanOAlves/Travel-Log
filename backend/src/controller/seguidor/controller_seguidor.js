/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de seguidor do BD.
 * 
 * Data: 28/11/2025
 * Versão: 1.0.0
 * Developer: Gabriel Lacerda Correia
 * Sobre: Controller feita sem as procedures inicialmente
 * 
 * Data: 07/12/2025
 * Versão: 1.1.0
 * Developer: Gabriel Lacerda Correia
 * Sobre: Adicionando camada de controle completa, inicio dos testes
 * 
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const seguidorDAO = require("../../model/DAO/seguidor-dao/seguidor.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

//Retorna todos os usuários que o usuário segue pelo id
const buscarSeguindo = async (usuario_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        
    try {
        
        if(!isNaN(usuario_id) && usuario_id != '' && usuario_id != null && usuario_id != undefined && usuario_id > 0) {

            resultSeguidor = await seguidorDAO.getSelectFollowing(user_id)

            if(resultSeguidor) {

                if(resultSeguidor.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.seguidores    = resultSeguidor

                    console.log(MESSAGES.DEFAULT_HEADER.items)
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

//Retorna todos os seguidores do usuário pelo id
const buscarSeguidores = async (usuario_id) => {

     MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        
    try {
        
        if(!isNaN(usuario_id) && usuario_id != '' && usuario_id != null && usuario_id != undefined && usuario_id > 0) {

            resultSeguidor = await seguidorDAO.getSelectFollowers(user_id)

            if(resultSeguidor) {

                if(resultSeguidor.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.seguidores    = resultSeguidor

                    console.log(MESSAGES.DEFAULT_HEADER.items)
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

//Registra uma relacao entre usuario e seguidor
const insereSeguidor = async (follow, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validar = validarSeguidor(follow)
            
            if(!validar) {
                
                resultSeguidor = await seguidorDAO.setInsertFollower(follow)

                if(resultSeguidor) {

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message             = MESSAGES.SUCCESS_CREATED_ITEM.message
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

//Remove um seguidor
const deletaSeguidor = async (follow, contentType) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
        try {
    
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            
                validar = validarSeguidor(follow)

                if (!validar) {
        
                    let resultSeguidor = await seguidorDAO.setDeleteFollower(follow)
        
                    if (resultSeguidor) {
        
                        MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_DELETE.status
                        MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_DELETE.status_code
                        MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_DELETE.message
                        delete MESSAGES.DEFAULT_HEADER.items
        
                        return MESSAGES.DEFAULT_HEADER // 200
        
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
        
                } else {
                    return validar // 400
                }

            } else {
                return MESSAGES.ERROR_CONTENT_TYPE //415
            }
    
        } catch (error) {
            return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
        }

}

//Valida dados vindos da requisição
const validarSeguidor = (seguir) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (seguir.usuario_id == null || seguir.usuario_id == undefined || seguir.usuario_id == "" || typeof seguir.usuario_id !== "number") {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [USUÁRIO ID INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (seguir.seguidor_id == null || seguir.seguidor_id == undefined || seguir.seguidor_id == "" || typeof seguir.seguidor_id !== "number") {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [SEGUIDOR ID INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}


module.exports = {
    buscarSeguindo,
    buscarSeguidores,
    insereSeguidor,
    deletaSeguidor
}