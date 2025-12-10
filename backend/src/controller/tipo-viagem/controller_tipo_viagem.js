/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de tipos de viagem do BD.
 * Data: 10/12/2025
 * Developer: Edvan Alves
 * Versão: 
 * 1.0.0 # get
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const tipoViagemDAO = require("../../model/DAO/tipo-viagem-dao/tipo-viagem.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

//Listar todos os usuários
const listarTipos = async () => {
    //Criando uma instância de default_messages
    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {

        resultTipos = tipoViagemDAO.getTravelTypes()

        if (resultTipos) {

            if (resultTipos.length > 0) {

                MESSAGES.DEFAULT_HEADER.status = DEFAULT_MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = DEFAULT_MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.items.tipos_viagens = resultTipos

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


module.exports = {
    listarTipos
}