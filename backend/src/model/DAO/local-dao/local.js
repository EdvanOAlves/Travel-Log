/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * local.
 * 
 * Data: 08/12/2025
 * Versão: 1.0.0 
 * Developer: Edvan Alves
 * Sobre: Adiciona a camada de modelagem para
 * a tabela viagem do BD.
 * 
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma");

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient();

// Retorna todos os locais que um usuário visitou
const getSelectLocationsByUserId = async (user_id) => {
    try {
        sql = `CALL BuscarLocaisUsuario(${user_id})`
        result = await prisma.$queryRawUnsafe(sql);

        if (result.length == 0) {
            return "ERRO_404"
        }

        //Se converte o resultado de verifica para String para passar na verificação
        //do IF, pelo método includes apenas utilizar Strings e Arrays para fazer
        //a verificação
        verifica = result[0].f0.toString()

        if (!verifica.includes('ERRO_404')) {
            formattedResult = result.map(item => {
                return {
                    id_local: item.f0,
                    nome_local: item.f1,
                    cidade: item.f2,
                    estado: item.f3,
                    id_pais: item.f4,
                    nome_pais: item.f5
                }
            })
            return formattedResult;
        } else {
            return result;
        }
    } catch (error) {
        console.log(error);
        return false
    }
}
//Retorna Países visitados pelo usuário
const getSelectCountriesByUserId = async (user_id) => {

    try {
        sql = `CALL BuscarPaisesUsuario(${user_id})`

        result = await prisma.$queryRawUnsafe(sql)

        if (result.length == 0) {
            return "ERRO_404"
        }

        //Se converte o resultado de verifica para String para passar na verificação
        //do IF, pelo método includes apenas utilizar Strings e Arrays para fazer
        //a verificação
        verifica = result[0].f0.toString()

        if (!verifica.includes('ERRO_404')) {

            formattedResult = result.map(item => {
                return {
                    id: item.f0,
                    nome: item.f1
                }
            })
            return formattedResult

        } else {
            return result;
        }
    } catch (error) {
        return false
    }

}

//Insere local no banco 
const setInsertLocal = async (local) => {

    try {
        
        sql = `
            INSERT INTO tbl_local (
                nome,
                estado,
                cidade,
                pais_id
            ) VALUES (
                '${local.nome_local}',
                '${local.estado}',
                '${local.cidade}',
                ${pais_id}
            )
        `

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

//Retorna o último local registrado
const getSelectLastLocal = async () => {

    try {
    
        sql = `select * from tbl_local order by id desc limit 1`

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
    getSelectLocationsByUserId,
    getSelectCountriesByUserId,
    getSelectLastLocal,
    setInsertLocal
}