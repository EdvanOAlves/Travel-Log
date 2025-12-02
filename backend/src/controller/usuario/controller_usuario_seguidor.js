/**********************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app
 * e a model para o CRUD na relação entre usuário e seguidor.
 * Data: 01/12/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

const usuarioSeguidorDAO = require("../../model/DAO/usuario-dao/usuario_seguidor.js")
const DEFAULT_MESSAGES = require("../module/config_messages.js")

//Listar todos ids de seguidores de determinado usuário
const listarSeguidoresUsuarioid = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if(!isNaN(id) || id <= 0 || id == undefined || id == null || id == "") {

            resultUsuarioSeguidor = await usuarioSeguidorDAO.getSelectFollowersByUserId(id)

            if(resultUsuarioSeguidor) {

                MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.seguidores    = resultUsuarioSeguidor

                return MESSAGES.DEFAULT_HEADER //200

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

module.exports = { listarSeguidoresUsuarioid }