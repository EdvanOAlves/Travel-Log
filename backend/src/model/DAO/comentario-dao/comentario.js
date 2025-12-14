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
        
        sql = `select * from tbl_comentario where log_id = ${log_id} AND visivel = true`
        
        result = await prisma.$queryRawUnsafe(sql);
        
        if (Array.isArray(result)) {
            return result
        } else {
            return false
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
        console.log(result)

        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

const getSelectLastComment = async () => {

    try {
        
        sql = `SELECT * FROM tbl_comentario ORDER BY id DESC LIMIT 1`

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