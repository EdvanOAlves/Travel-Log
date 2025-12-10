/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * comentario.
 * 
 * Data: 05/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 * Sobre: Versão inicial da camada de modelagem com as procedures
 * 
 * Data: 07/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.1.0
 * Sobre: Lidando com os retornos do banco de dados em casos de erro
 * 
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma")

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

//Retorna os comentários de determinado log
const getSelectCommentsByLogId = async (log_id) => {

    try {
        
        sql = `CALL BuscarComentariosLog(${log_id})`
        
        result = await prisma.$queryRawUnsafe(sql);
        
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

                    usuario_id: item.f0,
                    apelido: item.f1,
                    foto_perfil: item.f2,
                    comentario_id: item.f3,
                    conteudo: item.f4,
                    data: item.f5

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

//Retorna um comentário pelo id
const getSelectCommentById = async (id) => {

    try {
        
        sql = `SELECT * FROM tbl_comentario WHERE id = ${id}`

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

const getSelectLastComment = async (id) => {

    try {
        
        sql = `SELECT * FROM tbl_comentario ORDER BY id DESC LIMIT 1`

        result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(sql)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

//Registra um comentário
const setInsertComment = async (comment) => {

    try {
        
        sql = `CALL PublicarComentario(
            '${comment.conteudo}',
            ${comment.usuario_id},
            ${comment.log_id}
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

//Desativa um comentário
const setDeactiveComment = async (comentario_id) => {

    try {
        
        sql = `CALL DesativarComentario(${comentario_id})`

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
    getSelectCommentsByLogId,
    getSelectCommentById,
    getSelectLastComment,
    setDeactiveComment,
    setInsertComment
}