/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de comentario do BD.
 * Data: 07/12/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const comentarioDAO = require("../../model/DAO/comentario-dao/comentario.js")

const controllerUsuario = require("../usuario/controller_usuario.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

//Retorna os comentários de determinado log
const buscarComentariosLogId = async (log_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        
    try {
        
        if(!isNaN(log_id) && log_id != '' && log_id != null && log_id != undefined && log_id > 0) {

            resultComentario = await comentarioDAO.getSelectCommentsByLogId(log_id)

            if(resultComentario) {

                if(resultComentario.length > 0) {

                    comentarios = []

                    for (comentario of resultComentario) {

                        idUsuario = comentario.usuario_id
                        usuarioResult = await controllerUsuario.buscarUsuarioId(idUsuario)

                        usuario = usuarioResult.items.usuario

                        comentarios.push(

                            {
                                usuario_id: usuario.id,
                                apelido: usuario.apelido,
                                foto_perfil: usuario.foto_perfil,
                                comentario_id: comentario.id,
                                conteudo: comentario.conteudo,
                                data_publicacao: comentario.data_publicacao
                            }

                        )

                    }

                    delete MESSAGES.DEFAULT_HEADER.items.seguidores

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.comentarios   = comentarios
                    
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

const buscarComentarioId = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
        try {
            
            if (!isNaN(id) && id != '' && id != null && id != undefined && id > 0) {
    
                resultComentario = await comentarioDAO.getSelectCommentById(id)

                if (resultComentario) {
    
                    if (resultComentario.length > 0) {
    
                        MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                        MESSAGES.DEFAULT_HEADER.items.comentario    = resultComentario
    
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

//Registra um comentário
const insereComentario = async (comentario, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validar = validarComentario(comentario)
            
            if(!validar) {
    
                resultComentario = await comentarioDAO.setInsertComment(comentario)

                if(resultComentario) {
    
                    comentarioRegistrado = await comentarioDAO.getSelectLastComment()

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.items.comentario    = comentarioRegistrado
    
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

//Desativa um comentário
const desativaComentario = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        
    try {

        validarId = await buscarComentarioId(id)
        console.log(validarId)

        if (validarId.status_code == 200) {

            resultComentario = await comentarioDAO.setDeactiveComment(id)

            if(resultComentario) {

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

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}


const validarComentario = (comentario) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (comentario.conteudo == null || comentario.conteudo == undefined || comentario.conteudo == "" || typeof comentario.conteudo != "string" || comentario.conteudo.length > 255) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CONTEUDO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (comentario.usuario_id == null || comentario.usuario_id == undefined || comentario.usuario_id == "" || typeof comentario.usuario_id != "number") {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [USUARIO ID INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (comentario.log_id == null || comentario.log_id == undefined || comentario.log_id == "" || typeof comentario.log_id != "number") {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [LOG ID INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

module.exports = {

    buscarComentariosLogId,
    buscarComentarioId,
    insereComentario,
    desativaComentario

}
