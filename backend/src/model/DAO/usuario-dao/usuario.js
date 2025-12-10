/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * usuários.
 * Data: 28/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

// Import da dependência do client do prisma para conexão com o BD.
const { PrismaClient } = require("../../../generated/prisma")

// Criando novo objeto baseado na classe PrismaClient
const prisma = new PrismaClient()


//Retorna todos os usuários
const getSelectAllUsers = async () => {

    try {
        
        sql = "select * from tbl_usuario"

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

//Retorna um usuário pelo id
const getSelectUserById = async (id) => {

    try {
        
        sql = `select * from tbl_usuario where id = ${id}`

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

//Retorna o último usuário registrado na tabela de usuários
const getSelectLastUser = async () => {

    try {
        
        sql = `select * from tbl_usuario order by id desc limit 1`

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

//Valida login
const getSelectUserLogin = async (email, senha) => {

    try {
        
        sql = `SELECT id
            FROM tbl_usuario
            WHERE email = '${email}' AND senha = '${senha}'`


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

//Registra um usuário na tabela de usuários
const setInsertUser = async (user) => {

    try {
        
        sql = `CALL CriarUsuario(
            ${user.nome},
            ${user.apelido},
            ${user.email},
            ${user.senha},
            ${user.foto_perfil},
            ${user.descricao}
        )`
        
        result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }

}

//Atualiza um usuário na tabela de usuários
const setUpdateUser = async (id, user) => {

    try {
        
        sql = `CALL AtualizaUsuario(
            ${id},
            ${user.nome},
            ${user.apelido},
            ${user.email},
            ${user.senha},
            ${user.foto_perfil},
            ${user.descricao},
            ${user.status}
        )`

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
    getSelectAllUsers,
    getSelectUserById,
    getSelectLastUser,
    getSelectUserLogin,
    setInsertUser,
    setUpdateUser
}

