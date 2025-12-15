module.exports = {
    like: {
        type: 'object',
        properties: {
            "log_id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "usuario_id": {
                "type": "int",
                "description": "id",
                "example": 2
            }
        }
    },
    interacao: {
        type: 'object',
        properties: {
            "curtido": {
                "type": "boolean",
                "description": "curtido",
                "example": true
            },
            "favoritado": {
                "type": "boolean",
                "description": "favoritado",
                "example": false
            }
        }
    }
}