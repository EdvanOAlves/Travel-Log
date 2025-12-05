/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * logs.
 * Data: 04/12/2025
 * Developer: Edvan Alves
 * Versão: 1.0.0
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma");

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient();

// Retorna os logs para o feed de explorar (os mais recentes)
//Precisa do id de usuário para identificar se o log foi curtido
const getExploreLogs = async (user_id) => {
try {
        result = await prisma.$queryRawUnsafe(`CALL BuscarLogsRecentes(${user_id})`);

        if (Array.isArray(result)) {
            const output = [];
            for (item of result) {
                log = {
                    log_id: item.f3,
                    descricao: item.f4,
                    data_publicacao: item.f5,
                    qtde_curtidas: item.f6,
                    qtde_favoritos:item.f7,
                    local:{
                        local_id: item.f11,
                        ponto_interesse: item.f12,
                        cidade: item.f13,
                        estado: item.f14,
                        pais_id: item.f15,
                        pais: item.f16
                    },
                    autor:{
                        autor_id: item.f0,
                        autor_apelido: item.f1,
                        autor_foto: item.f2
                    },
                    viagem: {
                        titulo_viagem: item.f8,
                        tipo_viagem_id: item.f9,
                        tipo_viagem: item.f10,
                    },
                    interacao: {
                        curtido: item.f17,
                        favoritado: item.f18
                    }
                }
                output.push(log);
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
    
}


// Registra um log
const setInsertLog = async (log) => {
    try {
        sql = `CALL CriarViagem(
                '${log.descricao}',
                '${log.viagem_id}',
                '${log.visivel}',
                '${log.local.pais_nome}',
                ${log.estado},
                ${log.cidade},
                ${log.nome_local}
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

//TODO: deletar o script de testes depois
async function main(){
    result = await getExploreLogs(1);
    console.log(banana);

}
main();

module.exports = {
    // getTravelByLogId,
    // setInsertTravel,
    // setUpdateTravelById,
    // setDeleteTravelById
}