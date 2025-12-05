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

//Retorna seguidores pelo id de usuario
const getSelectFollowersByUserId = async (id_usuario) => {

    try {
    
        sql = `CALL BuscarSeguidores(${id_usuario})`

        result = await prisma.$queryRawUnsafe(sql)

        formattedResult = result.map(item => {
            
            return {
                id_relacao: item.f0,
                id_seguidor: item.f1,
                nome: item.f2,
                apelido: item.f3,
                foto: item.f4
            }

        })

        if(Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

//Busca todos os usuários que determinado usuário segue
const getSelectFollowingByUserId = async (id_usuario) => {

    try {
    
        sql = `CALL BuscarSeguindo(${id_usuario})`

        result = await prisma.$queryRawUnsafe(sql)

        formattedResult = result.map(item => {
            
            return {
                id_relacao: item.f0,
                id_seguido: item.f1,
                nome: item.f2,
                apelido: item.f3,
                foto: item.f4
            }

        })

        console.log(formattedResult)

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
        
        sql = `CALL CriarRelacaoSeguidor(${follow.usuario_id}, ${follow.seguidor_id})`

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
        
        sql = `CALL RemoverRelacaoSeguidor(${follow.usuario_id}, ${follow.seguidor_id})`

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

//Deleta todas as relações de quem o usuário segue, e quem segue ele
const setDeleteFollowersAndFollowingById = async (usuario_id) => {

    try {
        
        sql = `CALL RemoverRelacoesSeguidores(${usuario_id})`

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

// getSelectLastFollow()
// getSelectFollowersByUserId(1)
// getSelectFollowingByUserId(1)

module.exports = {
    getSelectLastFollow,
    getSelectFollowersByUserId,
    getSelectFollowingByUserId,
    setInsertFollower,
    setDeleteFollower,
    setDeleteFollowersAndFollowingById
}