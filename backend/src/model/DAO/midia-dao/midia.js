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

        //Verifica se o array está vazio, pois precisa retornar
        //um 404 se não houver viagens cadastradas
        if (result.length == 0) {
            return result
        }

        //Se converte o resultado de verifica para String para passar na verificação
        //do IF, pelo método includes apenas utilizar Strings e Arrays para fazer
        //a verificação
        verifica = result[0].f0.toString()

        if (!verifica.includes('ERRO_404')) {
            
            formattedResult = result.map(item => {

                return {
                    midia_id: item.f0,
                    link: item.f1,

                }

            })

            return formattedResult
        } else {
            return []
        }

    } catch (error) {
        return false
    }

}

const getSelectMediaById = async (id_media) => {

    try {
        
        sql = `SELECT * FROM tbl_log_midia WHERE id = ${id_media}`

        result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

const getSelectLastMedia = async () => {

    try {
        
        sql = `select * from tbl_log_midia order by id desc limit 1`

        result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)) {
            return result
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
            ${media.log_id}
        )`

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

// Deleta um registro de midia
const setDeleteMedia = async (id_media) => {

    try {
        
        sql = `CALL DeletarMidia(${id_media})`

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
    getSelectMediasByLogId,
    getSelectMediaById,
    getSelectLastMedia,
    setInsertMedia,
    setDeleteMedia
}