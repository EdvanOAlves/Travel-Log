module.exports = {
    users: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "nome": {
                "type": "string",
                "description": "name",
                "example": "Mercury"
            },
            "apelido": {
                "type": "string",
                "description": "apelido",
                "example": "mercury.cxs"
            },
            "email": {
                "type": "string",
                "description": "email",
                "example": "mercury@email.com"
            },
            "telefone": {
                "type": "string",
                "description": "telefone",
                "example": "(11) 91234-2099"
            },
            "senha": {
                "type": "string",
                "description": "senha",
                "example": "1234@Mer"
            },
            "data_entrada": {
                "type": "string",
                "description": "entry_date",
                "example": "2025-11-20"
            },
            "foto_perfil": {
                "type": "string",
                "description": "profile_photo",
                "example": "user_photo.png"
            },
            "biografia": {
                "type": "string",
                "description": "biography",
                "example": "Hi, i'm Mercury! Nice to meet you. "
            },
            "status": {
                "type": "boolean",
                "description": "status",
                "example": "true"
            }
        }
    },
    usersGet: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "nome": {
                "type": "string",
                "description": "name",
                "example": "Mercury"
            },
            "apelido": {
                "type": "string",
                "description": "apelido",
                "example": "mercury.cxs"
            },
            "email": {
                "type": "string",
                "description": "email",
                "example": "mercury@email.com"
            },
            "telefone": {
                "type": "string",
                "description": "telefone",
                "example": "(11) 91234-2099"
            },
            "senha": {
                "type": "string",
                "description": "senha",
                "example": "1234@Mer"
            },
            "data_entrada": {
                "type": "string",
                "description": "entry_date",
                "example": "2025-11-20"
            },
            "foto_perfil": {
                "type": "string",
                "description": "profile_photo",
                "example": "user_photo.png"
            },
            "biografia": {
                "type": "string",
                "description": "biography",
                "example": "Hi, i'm Mercury! Nice to meet you. "
            },
            "status": {
                "type": "boolean",
                "description": "status",
                "example": "true"
            },
            "qtd_seguidores": {
                "type": "int",
                "description": "qtd",
                "example": 30
            },
            "qtd_seguindo": {
                "type": "int",
                "description": "qtd",
                "example": 30
            },
            "seguidores": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/followers"
                }
            },
            "seguindo": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/following"
                }
            }
        }
    },
    login: {
        type: 'object',
        properties: {
            "id_usuario": {
                "type": "int",
                "description": "id",
                "example": 1
            }
        }
    },
    userCreate: {
        type: 'object',
        properties: {
            "nome": {
                "type": "string",
                "description": "name",
                "example": "Mercury"
            },
            "apelido": {
                "type": "string",
                "description": "apelido",
                "example": "mercury.cxs"
            },
            "email": {
                "type": "string",
                "description": "email",
                "example": "mercury@email.com"
            },
            "senha": {
                "type": "string",
                "description": "senha",
                "example": "1234@Mer"
            },
            "telefone": {
                "type": "string",
                "description": "telefone",
                "example": "(11) 91234-2099"
            },
            "foto_perfil": {
                "type": "string",
                "description": "profile_photo",
                "example": null
            },
            "descricao": {
                "type": "string",
                "description": "descricao",
                "example": null
            },
            "ativo": {
                "type": "boolean",
                "description": "status",
                "example": true
            }
        }
    },
    usersAlias: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "apelido": {
                "type": "string",
                "description": "user",
                "example": "mercury.cxs"
            },
            "foto_perfil": {
                "type": "string",
                "description": "profile_photo",
                "example": "user_photo.png"
            }
        }
    }
}