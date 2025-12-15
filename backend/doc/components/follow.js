module.exports = {
    followers: {
        type: 'object',
        properties: {
            "relacao_id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "seguindo_id": {
                "type": "int",
                "description": "id",
                "example": 2
            },
            "nome": {
                "type": "string",
                "description": "nome",
                "example": "Gabriel Lacerda"
            },
            "apelido": {
                "type": "string",
                "description": "apelido",
                "example": "lacerdinha"
            },
            "foto_perfil": {
                "type": "string",
                "description": "foto_perfil",
                "example": "https://travellog.blob.core.windows.net/logs/1765657540898-TraveLog Modelo Logico.png"
            }
        }
    },
    following: {
        type: 'object',
        properties: {
            "relacao_id": {
                "type": "int",
                "description": "id",
                "example": 2
            },
            "seguido_id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "nome": {
                "type": "string",
                "description": "nome",
                "example": "Gabriel Lacerda"
            },
            "apelido": {
                "type": "string",
                "description": "apelido",
                "example": "lacerdinha"
            },
            "foto_perfil": {
                "type": "string",
                "description": "foto_perfil",
                "example": "https://travellog.blob.core.windows.net/logs/1765657540898-TraveLog Modelo Logico.png"
            }
        }
    },
    followCreate: {
        type: 'object',
        properties: {
            "usuario_id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "seguidor_id": {
                "type": "int",
                "description": "id",
                "example": 2
            }
        }
    },
    followDelete: {
        type: 'object',
        properties: {
            "usuario_id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "seguidor_id": {
                "type": "int",
                "description": "id",
                "example": 2
            }
        }
    }
}