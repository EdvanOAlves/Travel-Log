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
            "usuario": {
                "type": "string",
                "description": "user",
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
            "data_entrada": {
                "type": "string",
                "description": "entry_date",
                "example": "2025-11-20"
            },
            "status": {
                "type": "boolean",
                "description": "status",
                "example": "true"
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
            "usuario": {
                "type": "string",
                "description": "user",
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
            "usuario": {
                "type": "string",
                "description": "user",
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
            "data_entrada": {
                "type": "string",
                "description": "entry_date",
                "example": "2025-11-20"
            },
            "status": {
                "type": "boolean",
                "description": "status",
                "example": "true"
            },
            "seguidores": {
                
            },
            "viagens": {
                $ref: "#/components/schemas/userGetTravel"
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