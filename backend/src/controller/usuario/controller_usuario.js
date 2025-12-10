/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de usuário do BD.
 * Data: 28/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 
 * 1.0.0 # Somente informações básicas
 * 1.0.1 # Adiciona seguidores dos usuários nos gets
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const usuarioDAO = require("../../model/DAO/usuario-dao/usuario.js")

//Importando controllers para acesso de itens externos
const usuarioSeguidorController = require("../seguidor/controller_seguidor.js")
const usuarioViagemController = require('../viagem/controller_viagem.js')
const usuarioLogController = require('../log/controller_log.js')

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")



//Listar todos os usuários
const listarUsuarios = async () => {

    //Criando uma instância de default_messages
    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        resultUsuarios = await usuarioDAO.getSelectAllUsers()

        if (resultUsuarios) {

            if (resultUsuarios.length > 0) {

                for (usuario of resultUsuarios) {

                    resultSeguidores = await usuarioSeguidorController
                        .listarSeguidoresUsuarioid(usuario.id)

                    arraySeguidores = resultSeguidores.items.seguidores

                    seguidores = []

                    for (seguidor of arraySeguidores) {

                        id = seguidor.id_seguidor

                        resultUsuario = await usuarioDAO.getSelectUserById(id)

                        usuarioObject = resultUsuario[0]

                        seguidores.push({

                            id: usuarioObject.id,
                            nome: usuarioObject.nome,
                            apelido: usuarioObject.apelido,
                            foto_perfil: usuarioObject.link_foto_perfil

                        })


                    }


                    usuario.qtd_seguidores = arraySeguidores.length
                    usuario.seguidores = seguidores

                }

                delete MESSAGES.DEFAULT_HEADER.items.seguidores

                MESSAGES.DEFAULT_HEADER.status = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.usuario = resultUsuarios

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
const buscarUsuarioId = async (usuario_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(usuario_id) && usuario_id != '' && usuario_id != null && usuario_id != undefined && usuario_id > 0) {

            resultUsuario = await usuarioDAO.getSelectUserById(usuario_id)

            if (resultUsuario) {
                
                if (resultUsuario.length > 0) {
                    
                    resultSeguidores = await usuarioSeguidorController.buscarSeguidores(usuario_id)
                    // Caso o usuário não tenha seguidores
                    if (resultSeguidores.status_code == 404){
                        arraySeguidores = []
                    }
                    else{
                        arraySeguidores = resultSeguidores.items.seguidores
                    }

                    resultUsuario.qtd_seguidores = arraySeguidores.length
                    resultUsuario.seguidores = arraySeguidores

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.usuario = resultUsuario

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

// Buscar o todo o conteúdo de perfil de um usuário pelo id
// perfil_id é o dono do perfil, user_id é o id da sessão atual, usado conferir se está seguindo o dono do perfil
const buscarUsuarioPerfilId = async (user_id, perfil_id, filtros) => {
    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (isNaN(perfil_id) || perfil_id == '' || perfil_id == null || perfil_id == undefined || perfil_id <= 0) {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

        if (isNaN(user_id) || user_id == '' || user_id == null || user_id == undefined || user_id <= 0) {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

        // DADOS DE USUARIO
        console.log(perfil_id)
        resultUsuario = await buscarUsuarioId(perfil_id)

        if (resultUsuario.status_code != 200) {
            return resultUsuario                    //400, 404, 500
        }
        
        // DADOS DE SEGUIDOR
        // Verificando se o userId é um seguidor desse usuario
        resultUsuario.items.seguido = false
        for (seguidor in resultUsuario.seguidores) {
            if (seguidor.id == user_id) {
                resultUsuario.items.seguido = true
            }
        }
        
        // DADOS DE VIAGEM
        resultViagem = await usuarioViagemController.buscarViagemUsuarioId(perfil_id)
        if (resultViagem.status_code != 200 && resultLog.status_code != 404) { //404 é permitido, afinal o usuário pode só não ter conteudo
            console.log('erro em viagem')
            return resultViagem                    //400, 500
        }
        if(resultViagem.status_code == 404){
            resultViagem.items = [];
        }
        
        // DADOS DE LOG
        resultLog = await usuarioLogController.listarLogsUserId(perfil_id, filtros)
        if (resultLog.status_code != 200 && resultLog.status_code != 404) { //404 é permitido, afinal o usuário pode só não ter conteudo
            console.log('erro em log')
            return resultLog                    //400, 500
        }
        if(resultLog.status_code == 404){
            resultLog.items = [];
        }

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
        MESSAGES.DEFAULT_HEADER.items.usuario = resultUsuario.items
        MESSAGES.DEFAULT_HEADER.items.viagens = resultViagem.items.viagens
        MESSAGES.DEFAULT_HEADER.items.logs = resultLog.items.logs

        return MESSAGES.DEFAULT_HEADER //200
    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }


}

//Inserir usuário
const inserirUsuario = async (usuario, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validaUsuario = validarUsuario(usuario)

            if (!validaUsuario) {

                resultUsuario = await usuarioDAO.setInsertUser(usuario)

                if (resultUsuario) {

                    ultimoUsuario = await usuarioDAO.getSelectLastUser()

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.items.usuario = ultimoUsuario

                    return MESSAGES.DEFAULT_HEADER //201

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validaUsuario //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Atualizar dados do usuário
const atualizarUsuario = async (id, usuario, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validarId = await usuarioDAO.getSelectUserById(id)

            if (validarId) {

                validaUsuario = validarUsuario(usuario)

                if (!validaUsuario) {

                    resultUsuario = await usuarioDAO.setUpdateUser(id, usuario)

                    if (resultUsuario) {

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATE_ITEM.message
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
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Desativar ou ativar usuário
const altenarStatusUsuario = async (status, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            usuarioId = status.id

            validarId = await buscarUsuarioId(usuarioId)

            if (validarId.status_code == 200) {

                resultUsuario = await usuarioDAO.setToggleUser(usuarioId, status)

                if (resultUsuario) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATE_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATE_ITEM.message
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
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Validar dados da requisição
const validarUsuario = (usuario) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (usuario.nome == null || usuario.nome == undefined || usuario.nome == "" || typeof usuario.nome !== "string" || usuario.nome.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.apelido == null || usuario.apelido == undefined || usuario.apelido == "" || typeof usuario.telefone !== "string" || usuario.apelido.length > 25) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [APELIDO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.email == null || usuario.email == undefined || usuario.email == "" || typeof usuario.telefone !== "string" || usuario.email.length > 255) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [EMAIL INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.telefone == null || usuario.telefone == undefined || usuario.telefone == "" || typeof usuario.telefone !== "string" || usuario.telefone.length > 20) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [TELEFONE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.senha == null || usuario.senha == undefined || usuario.senha == "" || typeof usuario.telefone !== "string" || usuario.senha.length > 25) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [SENHA INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.foto_perfil == undefined || typeof usuario.telefone !== "string" || usuario.foto_perfil.length > 255) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [FOTO DE PERFIL INCORRETA]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.descricao == undefined || typeof usuario.telefone !== "string" || usuario.descricao.length > 250) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [DESCRICAO INCORRETA]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

async function main(){
    teste = await buscarUsuarioPerfilId(1, 2, {})
    console.log(teste)
}
main()

module.exports = {
    listarUsuarios,
    buscarUsuarioId,
    buscarUsuarioPerfilId,
    inserirUsuario,
    atualizarUsuario,
    altenarStatusUsuario
}