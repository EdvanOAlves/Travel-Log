module.exports = {
    comment: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "conteudo": {
                "type": "string",
                "description": "conteudo",
                "example": "Nossa! Que legal hein cara!!"
            },
            "usuario": {
                $ref: "#/components/schemas/usersAlias"
            },
            "postagem": {
                $ref: "#/components/schemas/log"
            }
        }
    },

    commentCreate: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "conteudo": {
                "type": "string",
                "description": "conteudo",
                "example": "Nossa! Que legal hein cara!!"
            },
            "usuario": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "postagem": {
                "type": "int",
                "description": "id",
                "example": 1
            }
        }
    }
}