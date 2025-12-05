/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * comentario.
 * Data: 05/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma")

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

//Retorna os comentários de determinado log
const getSelectCommentsByLogId = async (log_id) => {

    try {
        
        sql = `CALL BuscarComentariosLog(${log_id})`

        result = await prisma.$queryRawUnsafe(sql)

        resultFormatted = result.map(item => {

            return {

                id_usuario: item.f0,
                apelido: item.f1,
                foto_perfil: item.f2,
                id_comentario: item.f3,
                conteudo: item.f4,
                data: item.f5

            }

        })

        if(Array.isArray(result)) {
            return resultFormatted
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

        if(Array.isArray(result)) {
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

        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

//Desativa todos os comentários de um usuário
const setDeactiveComments = async (usuario_id) => {

    try {
        
        sql = `CALL DesativarComentarios(${usuario_id})`

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
    getSelectCommentsByLogId,
    setDeactiveComment,
    setDeactiveComments,
    setInsertComment
}