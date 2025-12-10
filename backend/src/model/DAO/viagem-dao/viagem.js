/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * viagens.
 * 
 * Data: 04/12/2025
 * Versão: 1.0.0 
 * Developer: Edvan Alves
 * Sobre: Adiciona a camada de modelagem para
 * a tabela viagem do BD.
 * 
 * Data: 06/12/2025
 * Versão: 1.1.0 
 * Developer: Gabriel Lacerda
 * Sobre: Aplica regras de validação de retorno do BD
 * para aplicar a modelagem dos dados.
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma");

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient();

// Retorna todas as viagens pertencentes a um id de usuário
const getSelectTravelsByUserId = async (user_id) => {
    
    try {
        
        sql = `CALL ListarViagensUsuario(${user_id})`
        
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

                    id_viagem: item.f0,
                    viagem_titulo: item.f1,
                    data_inicio: item.f2,
                    data_fim: item.f3,
                    thumbnail: item.f4,
                    visivel: item.f5,
                    tipo_viagem: item.f6

                }

            })

            return formattedResult;

        } else {
            return []
        }

    } catch (error) {
        return false
    }

}

// Retorna a viagem que um log pertence
const getSelectTravelByLogId = async (log_id) => {
    
    try {

        sql = `CALL BuscarViagemLogId(${log_id})`

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

                    id_viagem: item.f0,
                    titulo: item.f1,
                    data_inicio: item.f2,
                    data_fim: item.f3,
                    thumbnail: item.f4,
                    visivel: item.f5,
                    tipo_viagem: item.f6,
                    usuario_id: item.f7,
                    apelido: item.f8

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

// Busca uma viagem pelo id dela
const getSelectTravelById = async (id) => {

    try {
        
        sql = `SELECT * FROM tbl_viagem WHERE id = ${id}`

        result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false        
    }

}

//Retorna ultima viagem registrada
const getSelectLastTravel = async () => {

    try {
        sql = `SELECT * FROM tbl_viagem ORDER BY id DESC LIMIT 1`

        result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result)) {
            return result;
        }
        else {
            return false;
        }
    } catch (error) {
        return false
    }

}

// Registra uma viagem
const setInsertTravel = async (travel) => {

    try {

        let sql

        if (travel.data_fim == 'null') {

            sql = `CALL CriarViagem(
                '${travel.titulo}',
                '${travel.data_inicio}',
                NULL,
                '${travel.thumbnail}',
                ${travel.usuario_id},
                ${travel.tipo_viagem_id}
            )`

        } else {

            sql = `CALL CriarViagem(
                '${travel.titulo}',
                '${travel.data_inicio}',
                '${travel.data_fim}',
                '${travel.thumbnail}',
                ${travel.usuario_id},
                ${travel.tipo_viagem_id}
            )`

        }

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

// Atualiza uma viagem
const setUpdateTravelById = async (id_travel, travel) => {
    
    try {

        let sql

        if (travel.data_fim == 'null') {

            sql = `CALL AtualizarViagem(
                ${id_travel},
                '${travel.titulo}',
                '${travel.data_inicio}',
                NULL,
                '${travel.thumbnail}',
                ${travel.usuario_id},
                ${travel.tipo_viagem_id}
            )`

        } else {

            sql = `CALL AtualizarViagem(
                ${id_travel},
                '${travel.titulo}',
                '${travel.data_inicio}',
                '${travel.data_fim}',
                '${travel.thumbnail}',
                ${travel.usuario_id},
                ${travel.tipo_viagem_id}
            )`

        }

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

// Muda o status de visivel para true ou false
const setToggleTravel = async (travel_id) => {

    try {
        
        sql = `CALL AlternarStatusViagem(${travel_id})`

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

// Deleta uma viagem
const setDeleteTravelById = async (id) =>{
    try {
        
        sql = `CALL DeletaViagem(${id})`

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
    getSelectTravelByLogId,
    getSelectTravelsByUserId,
    getSelectLastTravel,
    getSelectTravelById,
    setInsertTravel,
    setToggleTravel,
    setUpdateTravelById,
    setDeleteTravelById
}