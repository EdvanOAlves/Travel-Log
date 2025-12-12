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

//Retorna todos os usuários que o usuário segue pelo id
const getSelectFollowing = async (user_id) => {

    try {
        
        sql = `CALL BuscarSeguindo(${user_id})`

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

                    relacao_id: item.f0,
                    seguido_id: item.f1,
                    nome: item.f2,
                    apelido: item.f3,
                    foto_perfil: item.f4

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

//Retorna todos os seguidores do usuário pelo id
const getSelectFollowers = async (user_id) => {

    try {
        
        sql = `CALL BuscarSeguidores(${user_id})`

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

                    relacao_id: item.f0,
                    seguidor_id: item.f1,
                    nome_seguidor: item.f2,
                    apelido_seguidor: item.f3,
                    foto_perfil_seguidor: item.f4

                }

            })

            return formattedResult

        } else {
            return []
        }

    } catch(error) {
        return false
    }

}

//Registra uma relacao entre usuario e seguidor
const setInsertFollower = async (follow) => {

    try {
        
        if (follow.usuario_id == follow.seguidor_id) {
            return false
        }

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

//Remove um seguidor
const setDeleteFollower = async (follow) => {

    try {

        sql = `CALL RemoverRelacaoSeguidor(${follow.usuario_id}, ${follow.seguidor_id})`
            
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
    getSelectFollowers,
    getSelectFollowing,
    setInsertFollower,
    setDeleteFollower
}