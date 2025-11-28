/**********************************************************************
 * Objetivo: Arquivo da camada de modelagem, responsável pelo CRUD de
 * usuários.
 * Data: 28/11/2025
 * Developer: Gabriel Lacerda Correia
 * Versão: 1.0.0
 *********************************************************************/

//Importando dependência do prisma responsável por executar scripts SQL no BD.
const { response } = require('express')
const { PrismaClient } = require('../../../generated/prisma')

//Criando objeto novo objeto da classe PrismaClient
const prisma = new PrismaClient()

//Retorna todos os usuários
const getSelectAllUsers = async () => {

    try {
    
        sql = "select * from tbl_usuario"

        response = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(response)) {
            return response
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

        response = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(response)) {
            return response
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

        response = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(response)) {
            return response
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
        
        sql = `
        insert into tbl_usuario(
            nome,
            apelido,
            email,
            telefone,
            senha,
            data_cadastro,
        ) VALUES (
        
            '${user.nome}',
            '${user.apelido}',
            '${user.email}',
            '${user.telefone}',
            '${user.senha}',
            'curdate()'

        );
        `

        response = await prisma.$executeRawUnsafe(sql)

        if(response) {
            return response
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

//Atualiza um usuário na tabela de usuários
const setUpdateUser = async (id, user) => {

    try {
        
        sql = `
        update tbl_usuario set
        nome = '${user.nome}',
        apelido = '${user.apelido}',
        email = '${user.email}',
        telefone = '${user.telefone}',
        senha = '${user.senha}',
        link_foto_perfil = '${user.foto_perfil}',
        descricao = '${user.descricao}'
        
        where id = ${id}
        `

        response = await prisma.$executeRawUnsafe(sql)

        if(response) {
            return response
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

//Desativa um usuário na tabela de usuários
//Toggle -> significa altenar entre dois estados, nesse caso true ou false.
const setToggleUser = async (id, status) => {

     try {
        
        sql = `
        update tbl_usuario set
        ativo = '${status.tipo}'
        where id = ${id}
        `

        response = await prisma.$executeRawUnsafe(sql)

        if(response) {
            return response
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
    setInsertUser,
    setUpdateUser,
    setToggleUser
}