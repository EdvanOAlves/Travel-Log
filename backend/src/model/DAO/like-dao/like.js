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

        sql = `CALL AltenarRelacaoLikes(${like.log_id}, ${like.usuario_id})`

        result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Retorna situação de interação do usuário em um log
const getSelectInteractions = async (curtida) => {
    try {
        let sql = `
        SELECT
        CAST(IF((SELECT COUNT(id) FROM tbl_curtida WHERE usuario_id = ${curtida.usuario_id} AND log_id = ${curtida.log_id}) > 0, true, false) AS JSON) AS curtido,
        CAST(IF((SELECT COUNT(id) FROM tbl_favorito WHERE usuario_id = ${curtida.usuario_id} AND log_id = ${curtida.log_id}) > 0, true, false) AS JSON) AS favoritado;
        `
        result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    setToggleLikeLog,
    getSelectInteractions
}