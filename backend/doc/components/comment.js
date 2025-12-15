module.exports = {
    comment: {
        type: 'object',
        properties: {
            "usuario_id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "apelido": {
                "type": "string",
                "description": "apelido",
                "example": "lacerda"
            },
            "foto_perfil": {
                "type": "string",
                "description": "link",
                "example": "https://travellog.blob.core.windows.net/logs/1765657540898-TraveLog Modelo Logico.png"
            },
            "comentario_id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "conteudo": {
                "type": "string",
                "description": "conteudo",
                "example": "Que legal em cara!"
            },
            "data_publicacao": {
                "type": "string",
                "description": "conteudo",
                "example": "2025-12-14"
            }
        }
    },

    commentCreate: {
        type: 'object',
        properties: {
            "conteudo": {
                "type": "string",
                "description": "conteudo",
                "example": "Nossa! Que legal hein cara!!"
            },
            "usuario_id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "log_id": {
                "type": "int",
                "description": "id",
                "example": 1
            }
        }
    }
}