/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de pais do BD.
 * 
 * Data: 28/11/2025
 * Versão: 1.0.0
 * Developer: Gabriel Lacerda Correia
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const paisDAO = require("../../model/DAO/pais-dao/pais.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

const buscarPaisNome = async (pais_nome) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if (isNaN(pais_nome) && pais_nome != undefined && pais_nome != null && pais_nome != "") {

            resultPais = await paisDAO.getSelectCountryByName(pais_nome)

            if (resultPais) {

                if(resultPais.length > 0) {

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.pais  = resultPais

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