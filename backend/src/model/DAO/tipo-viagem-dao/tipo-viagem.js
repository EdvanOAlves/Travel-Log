/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * tipos de viagens.
 * Data: 10/12/2025
 * Developer: Edvan Alves
 * Versão: 1.0.0
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma")

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()

//Retorna todos os usuários que o usuário segue pelo id
const getTravelTypes = async () => {
    try {
        
        sql = `SELECT * from tbl_tipo_viagem`

        result = await prisma.$queryRawUnsafe(sql)

        //Verifica se o array está vazio, pois precisa retornar
        //um 404 se não houver viagens cadastradas
        if (result.length == 0) {
            return result
        }

        if (result){
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}


module.exports = {
    getTravelTypes
}