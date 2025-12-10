/**********************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de viagem do BD.
 * Data: 08/12/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Importando funções de dependência de dados do usuário
const logDAO = require("../../model/DAO/log-dao/log.js")

// Importa controller de midia para fazer inserção das imagens do log no banco de dados
const controllerMidia = require("../midia/controller_midia.js")

// Importando mensagens de retorno com status code
const DEFAULT_MESSAGES = require("../module/config_messages.js")

//Retorna os logs para o feed de explorar (os mais recentes)
const buscarLogsFeed = async (usuario_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        
    try {
        
        if(!isNaN(usuario_id) && usuario_id != '' && usuario_id != null && usuario_id != undefined && usuario_id > 0) {

            resultLog = await logDAO.getSelectExploreLogs(usuario_id)

            if(resultLog) {
                
                if(resultLog.length > 0) {
                    
                    for(item of resultLog) {
                        
                        idLog = item.log[0].log_id

                        resultMidia = await controllerMidia.listarMidiasLogId(idLog)

                        if(resultMidia.status_code == 200) {
                            item.log[0].midias = resultMidia.items.midias
                        }

                    }

                    delete MESSAGES.DEFAULT_HEADER.items.midias

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.logs          = resultLog

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Retorna um log pelo id
const buscarLogId = async (log_id) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        
    try {
        
        if (!isNaN(log_id) && log_id != '' && log_id != null && log_id != undefined && log_id > 0) {

            resultLog = await logDAO.getSelectLogById(log_id)

            if (resultLog) {

                if (resultLog.length > 0) {

                    for (log of resultLog) {

                        resultMidia = await controllerMidia.listarMidiasLogId(log_id)
                        
                        if (resultMidia.status_code == 200) {
                            midias = resultMidia.items.midia
                            log.midias = midias
                            delete MESSAGES.DEFAULT_HEADER.items.midias
                        }

                    }

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.log           = resultLog

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Retorna todos os logs do usuário pelo id funciona
const listarLogsUserId = async (usuario_id) => {
    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        
    try {
        
        if(!isNaN(usuario_id) && usuario_id != '' && usuario_id != null && usuario_id != undefined && usuario_id > 0) {

            resultLog = await logDAO.getSelectAllLogsUserId(usuario_id)
            
            if(resultLog) {

                if(resultLog.length > 0) {

                    for(item of resultLog) {

                        logId = item.log_id

                        resultMidia = await controllerMidia.listarMidiasLogId(logId)
                        
                        if(resultMidia.status_code == 200) {
                            item.midias = resultMidia.items.midias
                        }

                    }

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.logs          = resultLog

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Retorna os logs das pessoas que o usuário segue
const listarFeedSeguindo = async (usuario_id) => {
    
    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
        
    try {
        
        if(!isNaN(usuario_id) && usuario_id != '' && usuario_id != null && usuario_id != undefined && usuario_id > 0) {

            resultLog = await logDAO.getSelectLogsFollowing(usuario_id)
            if(resultLog) {

                if(resultLog.length > 0) {

                    for (item of resultLog) {

                        log = item.log[0]
                        logId = log.log_id
                        
                        resultMidia = await controllerMidia.listarMidiasLogId(logId)
                        
                        if(resultMidia.status_code == 200) {
                            midias = resultMidia.items.midias
                            log.midias = midias
                        }

                    }

                    delete MESSAGES.DEFAULT_HEADER.items.midias

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.items.logs          = resultLog

                    return MESSAGES.DEFAULT_HEADER //200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND //404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Registra um log novo funciona
const insereLog = async (log, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validar = validarLog(log)
            
            if(!validar) {
    
                resultLog = await logDAO.setInsertLog(log)
                
                if(resultLog) {
    
                    logRegistrado = await logDAO.getSelectLastLog()

                    midias = log.midias

                    for (midia of midias) {

                        log = logRegistrado[0]

                        midiaObject = { link: midia.link, indice: midia.indice, log_id: log.id }
                        
                        resultMidia = await controllerMidia.insereMidia(midiaObject, contentType)

                        if (resultMidia.status_code != 201) {
                            
                            MESSAGES.ERROR_RELATINAL_INSERTION += ' [MIDIA]'
                            return MESSAGES.ERROR_RELATINAL_INSERTION

                        }

                    }

                    midiasCriadas = await controllerMidia.listarMidiasLogId(logRegistrado[0].id)

                    delete MESSAGES.DEFAULT_HEADER.items.midia
                    delete MESSAGES.DEFAULT_HEADER.items.midias

                    MESSAGES.DEFAULT_HEADER.status              = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code         = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.items.log           = logRegistrado
    
                    return MESSAGES.DEFAULT_HEADER //200
    
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }
    
            } else {
                return validar //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }
    
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Atualiza um log
const atualizaLog = async (log_id, log, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
            
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            validarId = await buscarLogId(log_id)
            
            if (validarId.status_code == 200) {

                valida = validarLog(log)
                
                if(!valida) {

                    resultLog = await logDAO.setUpdateLog(log_id, log)

                    if(resultLog) {
                        
                        midiaResult = await controllerMidia.listarMidiasLogId(log_id)
                        midias = midiaResult.items.midias

                        for (midia of midias) {
                            
                            idMidia = midia.midia_id

                            deleteMidia = await controllerMidia.deletaMidia(idMidia)
                            
                            if (deleteMidia.status_code != 200) {
                                MESSAGES.ERROR_RELATINAL_INSERTION += ' [MIDIA]'
                                return MESSAGES.ERROR_RELATINAL_INSERTION
                            }

                        }

                        novasMidias = log.midias
                        
                        for (midia of novasMidias) {

                            midiaObject = { link: midia.link, indice: midia.indice, log_id: log_id }
                            
                            resultMidia = await controllerMidia.insereMidia(midiaObject, contentType)
                            
                            if (resultMidia.status_code != 201) {
                                
                                MESSAGES.ERROR_RELATINAL_INSERTION += ' [MIDIA]'
                                return MESSAGES.ERROR_RELATINAL_INSERTION

                            }

                        }
                        

                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATE_ITEM.message
                        delete MESSAGES.DEFAULT_HEADER.items
                        
                        return MESSAGES.DEFAULT_HEADER //200

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validarUsuario // 400
                }

            } else {
                return validarId // 400 ou 404 ou 500
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Deleta um log funciona
const deletaLog = async (log_id) => {

    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        
        let validarId = await buscarLogId(log_id)

        if (validarId.status_code == 200) {

            let resultLog = await logDAO.setDeleteLog(log_id)


            if (resultLog) {

                MESSAGES.DEFAULT_HEADER.status          = MESSAGES.SUCCESS_DELETE.status
                MESSAGES.DEFAULT_HEADER.status_code     = MESSAGES.SUCCESS_DELETE.status_code
                MESSAGES.DEFAULT_HEADER.message         = MESSAGES.SUCCESS_DELETE.message
                delete MESSAGES.DEFAULT_HEADER.items

                return MESSAGES.DEFAULT_HEADER // 200

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            return validarId // (400, 404, 500)
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

//Valida os dados vindos da requisição
const validarLog = (log) => {

    MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
        if (log.descricao == null || log.descricao == undefined || log.descricao == "" || typeof log.descricao !== "string" || log.descricao.length > 1500) {
    
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [DESCRICAO INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
    
        } else if (log.viagem_id == null || log.viagem_id == undefined || log.viagem_id == "" || typeof log.viagem_id !== "number") {
    
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [VIAGEM ID INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
    
        } else if (log.visivel == null || log.visivel == undefined || log.visivel == "" || typeof log.visivel !==  "boolean") {
    
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [VISIVEL INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
    
        } else if (log.nome_pais == null || log.nome_pais == undefined || log.nome_pais == "" || typeof log.nome_pais !== "string" || log.nome_pais.length > 255) {
    
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [PAÍS NOME INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        } else if (log.estado == null || log.estado == undefined || log.estado == "" || typeof log.estado !== "string" || log.estado.length > 75) {
    
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ESTADO NOME INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS

        } else if (log.cidade == null || log.cidade == undefined || log.cidade == "" || typeof log.cidade !== "string" || log.cidade.length > 75) {
    
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [CIDADE NOME INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
    
    
        } else if (log.nome_local == null || log.nome_local == undefined || log.nome_local == "" || typeof log.nome_local !== "string" || log.nome_local.length > 255) {
            
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME LOCAL INCORRETO]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
    
        } else {
            return false
        }

}

log = {

    descricao: "Minhas férias",
    viagem_id: 6,
    nome_pais: "China",
    estado: "Xangai",
    cidade: "Xangai",
    nome_local: "Monte Fuji",
    visivel: true,
    midias: [
        
        {

            link: "teste",
            indice: 1

        },
        {

            link: "teste",
            indice: 2

        },
        {

            link: "teste",
            indice: 3

        }

    ]

}

contentType = 'application/json'

atualizaLog(55, log, contentType)

module.exports = {

    buscarLogsFeed,
    buscarLogId,
    listarLogsUserId,
    listarFeedSeguindo,
    insereLog,
    atualizaLog,
    deletaLog

}