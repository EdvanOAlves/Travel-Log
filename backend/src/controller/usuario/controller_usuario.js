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

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

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

                    resultSeguindo = await usuarioSeguidorController.buscarSeguindo(usuario_id)
                    //Caso o usuário não esteja seguindo ninguém
                    if (resultSeguindo.status_code == 404){
                        arraySeguindo = []
                    }
                    else{
                        arraySeguindo = resultSeguindo.items.seguindo
                    }

                    resultUsuario[0].qtd_seguidores = arraySeguidores.length
                    resultUsuario[0].qtd_seguindo = arraySeguindo.length
                    
                    
                    resultUsuario[0].seguidores = arraySeguidores
                    resultUsuario[0].seguindo = arraySeguindo

                    
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.usuario = resultUsuario[0]

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

//Busca o login dentro do BD
const buscarLogin = async (email, senha) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
     
        if(email.length > 0 && email != null && email != undefined && email != "" && email.length < 255) {

            if(senha.length > 0 && senha != null && senha != undefined && senha != "" && senha.length < 75) {

                resultLogin = await usuarioDAO.getSelectUserLogin(email, senha)
                
                if (resultLogin) {

                    idUsuario = resultLogin[0].id

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.id_usuario    = idUsuario

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                MESSAGES.ERROR_REQUIRED_FIELDS += " [SENHA]"
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS += " [EMAIL]"
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// Buscar o todo o conteúdo de perfil de um usuário pelo id
// perfil_id é o dono do perfil, user_id é o id da sessão atual, usado conferir se está seguindo o dono do perfil
const buscarUsuarioPerfilId = async (user_id, perfil_id, filtros) => {
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        if (isNaN(perfil_id) || perfil_id == '' || perfil_id == null || perfil_id == undefined || perfil_id <= 0) {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

        if (isNaN(user_id) || user_id == '' || user_id == null || user_id == undefined || user_id <= 0) {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

        // DADOS DE USUARIO
        resultUsuario = await buscarUsuarioId(perfil_id)

        if (resultUsuario.status_code != 200) {
            return resultUsuario                    //400, 404, 500
        }

        perfil = resultUsuario.items.usuario
        
        // DADOS DE SEGUIDOR
        // Verificando se o userId é um seguidor desse usuario
        perfil.seguido = false
        for (seguidor in resultUsuario.seguidores) {
            if (seguidor.id == user_id) {
                perfil.seguido = true
            }
        }
        
        // DADOS DE VIAGEM
        resultViagem = await usuarioViagemController.buscarViagemUsuarioId(perfil_id)
        if (resultViagem.status_code != 200 && resultViagem.status_code != 404) { //404 é permitido, afinal o usuário pode só não ter conteudo
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
        
        perfil.viagens = resultViagem.items.viagens
        perfil.logs = resultLog.items.logs

        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
        MESSAGES.DEFAULT_HEADER.items.perfil = perfil

        return MESSAGES.DEFAULT_HEADER //200
    } catch (error) {
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
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Atualizar dados do usuário
const atualizarUsuario = async (id, usuario, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validarId = await buscarUsuarioId(id)

            if (validarId) {

                validaUsuario = validarUsuario(usuario)
                
                if (!validaUsuario) {

                    resultUsuario = await usuarioDAO.setUpdateUser(id, usuario)
                    

                    if (resultUsuario) {

                        MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        delete MESSAGES.DEFAULT_HEADER.items

                        return MESSAGES.DEFAULT_HEADER //200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validaUsuario // 400
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

const validarUsuario = (usuario) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(!isNaN(usuario.nome) || usuario.nome == null || usuario.nome == undefined || usuario.nome == "" || usuario.nome.length > 100) {
        
        MESSAGES.ERROR_REQUIRED_FIELDS.message += " [USUARIO INVALIDO]"
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!isNaN(usuario.apelido) || usuario.apelido == null || usuario.apelido == undefined || usuario.apelido == "" || usuario.apelido.length > 25){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += " [APELIDO INVALIDO]"
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (!isNaN(usuario.email) || usuario.email == null || usuario.email == undefined || usuario.email == "" || usuario.email.length > 255) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += " [EMAIL INCORRETO]"
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.telefone == null || usuario.telefone == undefined || usuario.telefone == "" || usuario.telefone.length > 20) {
        
        MESSAGES.ERROR_REQUIRED_FIELDS.message += " [TELEFONE INCORRETO]"
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (!isNaN(usuario.senha) || usuario.senha == null || usuario.senha == undefined || usuario.senha == "" || usuario.senha.length > 60) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += " [SENHA INVALIDA]"
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.foto_perfil == undefined || usuario.foto_perfil.length > 255){

        MESSAGES.ERROR_REQUIRED_FIELDS.message += " [FOTO PERFIL INVALIDA]"
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (usuario.descricao == undefined || usuario.descricao.length > 250) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += " [DESCRICAO INVALIDA]"
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (typeof usuario.status != "boolean" || usuario.status == null || usuario.status == undefined || usuario.status == "" || usuario.status.length > 100) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += " [STATUS INCORRETO]"
        return MESSAGES.DEFAULT_HEADER

    } else {
        return false
    }

}

module.exports = {
    listarUsuarios,
    buscarUsuarioId,
    buscarUsuarioPerfilId,
    buscarLogin,
    inserirUsuario,
    atualizarUsuario
}