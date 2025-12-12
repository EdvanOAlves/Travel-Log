module.exports = {
    pais: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "nome": {
                "type": "string",
                "description": "nome",
                "example": "Maldivas"
            }
        }
    },

    paisCreate: {
        type: 'object',
        properties: {
            "nome": {
                "type": "string",
                "description": "nome",
                "example": "Brasil"
            }
        }
    }
}