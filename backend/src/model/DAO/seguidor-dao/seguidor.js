/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * seguidores.
 * Data: 30/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma")

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

//Retorna o última relação registrada
const getSelectLastFollow = async () => {

    try {
        
        sql = `select * from tbl_seguidor order by id desc limit 1;`

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

//Segue determinado usuário
const setInsertFollower = async (follow) => {

    try {
        
        sql = `CALL Follow(${follow.seguidor_id}, ${follow.usuario_id})`

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

//Deixa de seguir determinado usuário
const setDeleteFollower = async (follow) => {

    try {
        
        sql = `CALL Unfollow(${follow.usuario_id}, ${follow.seguidor_id})`

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

module.exports = {
    getSelectLastFollow,
    setInsertFollower,
    setDeleteFollower
}