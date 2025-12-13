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
const getSelectExploreLogs = async (user_id, filtros) => {

    try {

        result = await prisma.$queryRaw`CALL BuscarLogsRecentes( 
        ${user_id}, 
        ${filtros.data_inicio},${filtros.data_fim},
        ${filtros.local_pais}, ${filtros.local_estado}, ${filtros.local_cidade}, ${filtros.nome_local},
        ${filtros.tipo_viagem_id})`

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
                            local: [
                                {
                                    local_id: item.f12,
                                    nome_local: item.f13,
                                    cidade: item.f14,
                                    estado: item.f15,
                                    pais: {
                                        pais_id: item.f16,
                                        pais: item.f17
                                    }
                                }
                            ]
                        }
                    ],
                    viagem: [
                        {
                            viagem_id: item.f8,
                            titulo: item.f9,
                            tipo_viagem_id: item.f10,
                            tipo_viagem: item.f11
                        }
                    ],
                    curtido: item.f18,
                    favoritado: item.f19

                }
            })

            return formattedResult

        } else {
            return []
        }

    } catch (error) {
        console.log(error)
        return false
    }

}

//Retorna todos os logs do usuário pelo id funciona
const getSelectAllLogsUserId = async (user_id, filtros) => {
    try {


        result = await prisma.$queryRaw`CALL ListarLogsUsuario( 
        ${user_id}, 
        ${filtros.data_inicio},${filtros.data_fim},
        ${filtros.local_pais}, ${filtros.local_estado}, ${filtros.local_cidade}, ${filtros.nome_local},
        ${filtros.tipo_viagem_id})`

        //Verifica se o array está vazio, pois precisa retornar
        //um 404 se não houver viagens cadastradas
        if (result.length == 0) {
            return []
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
                    local: [
                        {
                            local_id: item.f7,
                            nome_local: item.f8,
                            cidade: item.f9,
                            estado: item.f10,
                            pais: {
                                pais_id: item.f11,
                                pais: item.f12
                            }
                        }
                    ]

                }
            })

            return formattedResult

        } else {
            return []
        }

    } catch (error) {
        console.log(error)
        return false
    }

}

//Retorna todos os logs pelo id da viagem
const getSelectAllLogsByTravelId = async (travel_id) => {

    try {

        sql = `CALL BuscarLogsViagemId(${travel_id})`

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
                    data_publicacao: item.f2,
                    curtidas: item.f3,
                    favoritos: item.f4,
                    visivel: item.f5,
                    local: [
                        {
                            nome_local: item.f6,
                            cidade: item.f7,
                            estado: item.f8,
                            pais: item.f9
                        }
                    ]

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

        sql = `SELECT * FROM tbl_log WHERE id = ${log_id} `

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
const getSelectLogsFollowing = async (user_id, filtros) => {

    try {
        result = await prisma.$queryRaw`CALL BuscarFeedSeguindo( 
        ${user_id}, 
        ${filtros.data_inicio},${filtros.data_fim},
        ${filtros.local_pais}, ${filtros.local_estado}, ${filtros.local_cidade}, ${filtros.nome_local},
        ${filtros.tipo_viagem_id})`

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
                            local: [
                                {
                                    nome_local: item.f10,
                                    cidade: item.f11,
                                    estado: item.f12,
                                    pais: item.f13
                                }
                            ]
                        }
                    ],
                    viagem: [
                        {
                            viagem_id: item.f8,
                            titulo: item.f9
                        }
                    ],
                    curtido: item.f14,
                    favoritado: item.f15

                }
            })

            return formattedResult
        } else {
            return []
        }

    } catch (error) {
        console.log(error)
        return false
    }

}

//Registra um log novo funciona
const setInsertLog = async (log) => {

    try {

        sql = `
            INSERT INTO tbl_log (
                descricao,
                data_publicacao,
                contagem_curtidas,
                contagem_favoritos,
                visivel,
                viagem_id,
                local_id
            ) VALUES (
             
                '${log.descricao}',
                curdate(),
                0,
                0,
                true,
                ${log.viagem_id},
                ${log.local_id}

            )
        `

        try {
            result = await prisma.$executeRawUnsafe(sql)
        } catch (error) {
            console.log(error)
        }

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

        sql = `
            UPDATE FROM tbl_log SET
                descricao = '${log.descricao}',
                visivel   =  ${log.visivel}
                
                WHERE id = ${log_id}
                `

        result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return result
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
    getSelectAllLogsByTravelId,
    getSelectLastLog,
    getSelectLogById,
    setInsertLog,
    setUpdateLog,
    setDeleteLog

}

