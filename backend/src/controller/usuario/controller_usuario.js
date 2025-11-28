/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de usuário do BD.
 * Data: 28/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const usuarioDAO = require("../../model/DAO/usuario-dao/usuario.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

//Listar todos os usuários
const listarUsuarios = async () => {

    //Criando uma instância de default_messages
    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        resultUsuarios = await usuarioDAO.listarUsuarios()

        if (resultUsuarios) {

            if (resultUsuarios.length > 0) {

                MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.usuarios  = resultUsuarios

                return MESSAGES.DEFAULT_HEADER //200

            } else {
                return MESSAGES.ERROR_NOT_FOUND //404
            }

        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Buscar um usuário pelo id
const buscarUsuarioId = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (!isNaN(id) || id <= 0 || id == undefined || id == null || id == "") {

            resultUsuario = await usuarioDAO.getSelectUserById(id)

            if (resultUsuario) {

                if (resultUsuario.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.usuario   = resultUsuario

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

//Inserir usuário
const inserirUsuario = async (usuario, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validarUsuario = validarUsuario(usuario)

            if(!validarUsuario) {

                resultUsuario = await usuarioDAO.setInsertUser(usuario)

                if(resultUsuario) {

                    ultimoUsuario = await usuarioDAO.getSelectLastUser()

                    MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.usuario   = ultimoUsuario

                    return MESSAGES.DEFAULT_HEADER //201

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validarUsuario //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Atualizar dados do usuário
const atualizarUsuario = async (id, usuario, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validarId = await usuarioDAO.getSelectUserById(id) 

            if (validarId.status_code == 200) {

                validarUsuario = validarUsuario(usuario)

                if(!validar) {

                    resultUsuario = await usuarioDAO.setUpdateUser(id, usuario)

                    if(resultUsuario) {

                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        delete MESSAGES.DEFAULT_HEADER.items

                        return MESSAGES.DEFAULT_HEADER //200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarUsuario 
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

//Desativar usuário
const desativarUsuario = async (id, status) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        validarId = await usuarioDAO.getSelectUserById(id)

        if(!validarId) {

            if(typeof status === 'boolean') {

                resultUsuario = await usuarioDAO.setToggleUser(id, status)

                if(resultUsuario) {

                    MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_UPDATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_UPDATE_ITEM.message
                    delete MESSAGES.DEFAULT_HEADER.items

                    return MESSAGES.DEFAULT_HEADER // 200

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }

        } else {
            return validarId //400 ou 404 ou 500
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Validar dados da requisição
const validarUsuario = (usuario) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (usuario.nome == null || usuario.nome == undefined || usuario.nome == "" || !isNaN(usuario.nome) || usuario.nome.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.apelido == null || usuario.apelido == undefined || usuario.apelido == "" || !isNaN(usuario.apelido) || usuario.apelido.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [APELIDO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.email == null || usuario.email == undefined || usuario.email == "" || !isNaN(usuario.email) || usuario.email.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [EMAIL INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.telefone == null || usuario.telefone == undefined || usuario.telefone == "" || !isNaN(usuario.telefone) || usuario.telefone.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [TELEFONE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.senha == null || usuario.senha == undefined || usuario.senha == "" || !isNaN(usuario.senha) || usuario.senha.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [SENHA INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.foto_perfil == undefined || !isNaN(usuario.foto_perfil) || usuario.foto_perfil.length > 255) {
        
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [FOTO DE PERFIL INCORRETA]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.descricao == undefined || !isNaN(usuario.descricao) || usuario.descricao.length > 250) {
        
    }

} 