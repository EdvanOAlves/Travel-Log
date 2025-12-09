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
                    id_local: item.f0,
                    nome_local: item.f1,
                    cidade: item.f2,
                    estado: item.f3,
                    nome_pais: item.f5
                }

            })

            return formattedResult;

        } else {
            return result;
        }
    } catch (error) {
        return false
    }
}
//Retorna Países visitados pelo usuário
const getSelectCountriesByUserId = async (user_id) => {

    try {
        sql = `CALL BuscarPaisesUsuario(${user_id})`

        result = await prisma.$queryRawUnsafe(sql)

        if (result.length == 0) {
            return false
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

async function main(){
    teste = await getSelectCountriesByUserId(1)
    console.log(teste);
}
async function main2(){
    teste = await getSelectLocationsByUserId(1)
    console.log(teste);
}

main2();


module.exports = {
    getSelectLocationsByUserId,
    getSelectCountriesByUserId
}