/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * viagens.
 * Data: 04/12/2025
 * Developer: Edvan Alves
 * Versão: 1.0.0
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma");

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient();

// Retorna todas as viagens pertencentes a um id de usuário
const getTravelsByUserId = async (id) => {
    try {
        result = await prisma.$queryRawUnsafe(`CALL ListarViagensUsuario(${id})`);

        if (Array.isArray(result)) {
            const output = [];
            for (item of result) {
                viagem = {
                    id_viagem: item.f0,
                    viagem_titulo: item.f1,
                    data_inicio: item.f2,
                    data_fim: item.f3,
                    thumbnail: item.f4,
                    visivel: item.f5,
                    tipo_viagem: item.f6
                }
                output.push(viagem)
            }
            return output;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
}

// Retorna a viagem que um log pertence
const getTravelByLogId = async (id) => {
    try {

        result = await prisma.$queryRawUnsafe(`CALL BuscarViagemLogId(${id})`);

        if (Array.isArray(result)) {
            const output = [];
            for (item of result) {
                viagem = {
                    id_viagem: item.f0,
                    viagem_titulo: item.f1,
                    data_inicio: item.f2,
                    data_fim: item.f3,
                    thumbnail: item.f4,
                    visivel: item.f5,
                    tipo_viagem: item.f6
                }
                output.push(viagem)
            }
            return output;
        } else {
            return false;
        }
    } catch (error) {
        return false
    }
}


// Registra uma viagem
const setInsertTravel = async (travel) => {
    try {
        sql = `CALL CriarViagem(
                '${travel.titulo}',
                '${travel.data_inicio}',
                '${travel.data_fim}',
                '${travel.thumbnail}',
                ${travel.usuario_id},
                ${travel.tipo_viagem_id},
                ${travel.visivel}
            );`
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
const setUpdateTravelById = async (travel) => {
    try {
        sql = `CALL AtualizarViagem(
                ${travel.id},
                '${travel.titulo}',
                '${travel.data_inicio}',
                '${travel.data_fim}',
                '${travel.thumbnail}',
                ${travel.usuario_id},
                ${travel.tipo_viagem_id},
                ${travel.visivel}
            );`
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

// Deletar uma viagem
const setDeleteTravelById = async (id) =>{
    try {
        sql = `CALL DeletaViagem(${id})`;
        result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
        
    } catch (error) {
        
    }
}

module.exports = {
    getTravelByLogId,
    getTravelsByUserId,
    setInsertTravel,
    setUpdateTravelById,
    setDeleteTravelById
}