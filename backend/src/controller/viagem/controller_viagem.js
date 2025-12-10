/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de viagem do BD.
 * Data: 06/12/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const viagemDAO = require("../../model/DAO/viagem-dao/viagem.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

//Buscar viagens pelo id de usuário
const buscarViagemUsuarioId = async (usuario_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
        try {
            
            if(!isNaN(usuario_id) && usuario_id != '' && usuario_id != null && usuario_id != undefined && usuario_id > 0) {
    
                resultViagem = await viagemDAO.getSelectTravelsByUserId(usuario_id)

                if(resultViagem) {
    
                    if(resultViagem.length > 0) {

                        MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.viagens       = resultViagem
                        
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
            console.log(error)
            return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }

}

//Buscar viagem pelo id de log
const buscarViagemLogId = async (log_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
            
            if(!isNaN(log_id) && log_id != '' && log_id != null && log_id != undefined && log_id > 0) {
    
                resultViagem = await viagemDAO.getSelectTravelByLogId(log_id)
    
                if(resultViagem) {

                    if(resultViagem.length > 0) {

                        MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.viagens       = resultViagem
        
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

//Busca uma viagem pelo id
const buscarViagemId = async (viagem_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (!isNaN(viagem_id) && viagem_id != '' && viagem_id != null && viagem_id != undefined && viagem_id > 0) {
        
            resultViagem = await viagemDAO.getSelectTravelById(viagem_id)

            if (resultViagem) {

                if (resultViagem.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.viagem    = resultViagem

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

//Registra uma viagem
const insereViagem = async (viagem, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validar = validarViagem(viagem)

            if(!validar) {
    
                resultViagem = await viagemDAO.setInsertTravel(viagem)
                
                if(resultViagem) {
    
                    viagemRegistrada = await viagemDAO.getSelectLastTravel()

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message             = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.viagem        = viagemRegistrada
                    
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
            console.log(error)
            return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
        }

}

//Atualiza uma viagem
const atualizaViagem = async (id_viagem, viagem, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
            
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validarId = await buscarViagemId(id_viagem)

            if (validarId.status_code == 200) {

                valida = validarViagem(viagem)

                if(!valida) {

                    resultViagem = await viagemDAO.setUpdateTravelById(id_viagem, viagem)

                    if(resultViagem) {

                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        delete MESSAGES.DEFAULT_HEADER.items

                        return MESSAGES.DEFAULT_HEADER //200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarUsuario // 400
                }

            } else {
                return validarId // 400 ou 404 ou 500
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Deleta uma viagem
const deletaViagem = async (id_viagem) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        let validarId = await buscarViagemId(id_viagem)

        if (validarId.status_code == 200) {

            let resultViagem = await viagemDAO.setDeleteTravelById(id_viagem)

            if (resultViagem) {

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

//Altenar status de uma viagem publicada
const altenarStatusViagem = async (id_viagem) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validarId = await buscarViagemId(id_viagem)

            if (validarId.status_code == 200) {

                resultViagem = await viagemDAO.setToggleTravel(id_viagem)

                if(resultViagem) {

                    MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_UPDATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_UPDATE_ITEM.message
                    delete MESSAGES.DEFAULT_HEADER.items

                    return MESSAGES.DEFAULT_HEADER // 200

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validarId //400, 404, 500
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }        

}

const validarViagem = (viagem) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (viagem.titulo == null || viagem.titulo == undefined || viagem.titulo == "" || typeof viagem.titulo !== "string" || viagem.titulo.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [VIAGEM TITULO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (viagem.data_inicio == undefined || viagem.data_inicio == "" || typeof viagem.data_inicio !== "string") {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [DATA INÍCIO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (viagem.thumbnail == undefined || viagem.thumbnail == "" || typeof viagem.thumbnail !==  "string" || viagem.thumbnail.length > 255) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [THUMBNAIL INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (viagem.usuario_id == undefined || typeof viagem.usuario_id !== "number") {


        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [USUARIO ID INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS


    } else if (viagem.tipo_viagem_id == undefined || typeof viagem.tipo_viagem_id !== "number") {
        
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [FOTO DE PERFIL INCORRETA]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

module.exports = {
    buscarViagemUsuarioId,
    buscarViagemLogId,
    buscarViagemId,
    insereViagem,
    atualizaViagem,
    deletaViagem,
    altenarStatusViagem
}