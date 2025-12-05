/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * midia.
 * Data: 05/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma")

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

// Listar midias pelo id do log
const getSelectMediasByLogId = async (id_log) => {

    try {
        
        sql = `CALL ListarMidiasLog(${id_log})`

        result = await prisma.$queryRawUnsafe(sql)
        
        formattedResult = result.map(item => {
            
            return {
                id_midia: item.f0,
                link: item.f1,
                indice: item.f2
            }

        })

        if(Array.isArray(result)) {
            return formattedResult
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Registra o caminho de uma midia no banco
const setInsertMedia = async (media) => {

    try {
        
        sql = `CALL CriarMidia(
            '${media.link}',
            ${media.indice},
            ${media.log_id}
        )`

        result = await prisma.$executeRawUnsafe(sql)

        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

// Deleta um registro de midia
const setDeleteMedia = async (id_media) => {

    try {
        
        sql = `CALL DeletarMidia(${id_media})`

        result = await prisma.$executeRawUnsafe(sql)

        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

module.exports = {
    getSelectMediasByLogId,
    setInsertMedia,
    setDeleteMedia
}