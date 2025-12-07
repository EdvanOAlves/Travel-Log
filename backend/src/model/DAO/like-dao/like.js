/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD do
 * realcionamento entre log e usuário que representa curtida.
 * Data: 05/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma")

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

// Alternna o status de curtido de um log
const setToggleLikeLog = async (like) => {

    try {

        sql = `CALL AltenarRelacaoLikes(${like.id_log}, ${like.id_usuario})`

        result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

module.exports = {
    setToggleLikeLog
}