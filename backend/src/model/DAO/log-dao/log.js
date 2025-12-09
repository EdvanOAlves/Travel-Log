/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * logs.
 * 
 * Data: 04/12/2025
 * Developer: Edvan Alves
 * Versão: 1.0.0
 * Sobre: Inicio da construção da camada de modelagem de dados
 * 
 * Data: 07/12/2025
 * Developer: Gabriel Lacerda
 * Versão: 1.1.0
 * Sobre: Atualizando funções existentes e implementando o restante
 * das funções
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma");

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

//Retorna os logs para o feed de explorar (os mais recentes)
//Precisa do id de usuário para identificar se o log foi curtido funciona
const getSelectExploreLogs = async (user_id) => {
    
    try {

        sql = `CALL BuscarLogsRecentes(${user_id})`

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

                    usuario_id: item.f0,
                    apelido: item.f1,
                    foto_perfil: item.f2,
                    log: [
                        {
                            log_id: item.f3,
                            descricao: item.f4,
                            data_postagem: item.f5,
                            curtidas: item.f6,
                            favoritos: item.f7,
                        }
                    ],
                    viagem: [
                        {
                            viagem_id: item.f8,
                            titulo: item.f9,
                            nome_local: item.f10,
                            cidade: item.f11,
                            estado: item.f12,
                            pais: item.f13,
                        }
                    ],
                    curtido: item.f14,
                    favoritado: item.f15
                    
                }
            })

            return formattedResult;

        } else {
            return false;
        }

    } catch (error) {
        return false
    }
    
}

//Retorna todos os logs do usuário pelo id funciona
const getSelectAllLogsUserId = async (user_id) => {

    try {

        sql = `CALL ListarLogsUsuario(${user_id})`
        
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

                    log_id: item.f0,
                    descricao: item.f1,
                    data_postagem: item.f2,
                    curtidas: item.f3,
                    favoritos: item.f4,
                    visivel: item.f5,
                    viagem_id: item.f6,
                    local_id: item.f7

                }
            })

            return formattedResult;

        } else {
            return false;
        }

    } catch (error) {
        return false
    }

}

//Retorna o último log registrado
const getSelectLastLog = async () => {

    try {

        sql = `SELECT * FROM tbl_log ORDER BY id DESC LIMIT 1`
        
        result = await prisma.$queryRawUnsafe(sql)
        
        if (Array.isArray(result)) {
            return result
        } else {
            return false;
        }

    } catch (error) {
        return false
    }

}

//Retorna o log pelo id
const getSelectLogById = async (log_id) => {

    try {

        sql = `SELECT * FROM tbl_log WHERE id = ${log_id}`
        
        result = await prisma.$queryRawUnsafe(sql)
        
        if (Array.isArray(result)) {
            return result
        } else {
            return false;
        }

    } catch (error) {
        return false
    }

}

//Retorna os logs das pessoas que o usuário segue
const getSelectLogsFollowing = async (user_id) => {

    try {

        sql = `CALL BuscarFeedSeguindo(${user_id})`
        
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

                    usuario_id: item.f0,
                    apelido: item.f1,
                    foto_perfil: item.f2,
                    log: [
                        {
                            log_id: item.f3,
                            descricao: item.f4,
                            data_postagem: item.f5,
                            curtidas: item.f6,
                            favoritos: item.f7
                        }
                    ],
                    viagem: [
                        {
                            viagem_id: item.f8,
                            titulo: item.f9,
                            nome_local: item.f10,
                            cidade: item.f11,
                            estado: item.f12
                        }
                    ],
                    curtido: item.f13,
                    favoritado: item.f14

                }
            })

            return formattedResult;
        } else {
            return false;
        }

    } catch (error) {
        return false
    }

}

//Registra um log novo funciona
const setInsertLog = async (log) => {

    try {

        sql = `CALL PublicarLog(
            '${log.descricao}',
            ${log.viagem_id},
            ${log.visivel},
            '${log.nome_pais}',
            '${log.estado}',
            '${log.cidade}',
            '${log.nome_local}'
        )`

        result = await prisma.$executeRawUnsafe(sql)        

        if (result) {
            return result;
        }
        else {
            return false;
        }

    } catch (error) {
        return false
    }

}

//Atualiza um log
const setUpdateLog = async (log_id, log) => {

    try {

        sql = `CALL AtualizaLog(
            ${log_id},
            '${log.descricao}',
            ${log.viagem_id},
            '${log.nome_pais}',
            '${log.estado}',
            '${log.cidade}',
            '${log.nome_local}',
            ${log.visivel}
        )`

        result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return resultw
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}

//Deleta um log funciona
const setDeleteLog = async (log_id) => {

    try {
        
        sql = `CALL DeletaLog(${log_id})`
        
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

module.exports = {
    
    getSelectExploreLogs,
    getSelectAllLogsUserId,
    getSelectLogsFollowing,
    getSelectLastLog,
    getSelectLogById,
    setInsertLog,
    setUpdateLog,
    setDeleteLog

}

getSelectLogsFollowing(1)