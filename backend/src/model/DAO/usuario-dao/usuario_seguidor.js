/**********************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela do BD referente
 * ao relacionamento entre usuario, e seguidor.
 * Data: 01/12/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma")

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

//Retorna todos os seguidores de determinado usuário
const getSelectFollowersByUserId = async (id) => {

    try {
        
        sql = `CALL ListarSeguidores(${id})`

        result = await prisma.$queryRawUnsafe(sql)

        formattedResult = result.map(object => {
            return {
                id_seguidor: object.f0
            }
        })

        if(Array.isArray(formattedResult)) {
            return formattedResult
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

module.exports = { getSelectFollowersByUserId }