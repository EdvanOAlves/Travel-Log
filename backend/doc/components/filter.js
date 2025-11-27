module.exports = {
    filter: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "tipo": {
                "type": "string",
                "description": "type",
                "example": "Lazer"
            }
        }
    },
    filterCreate: {
        type: 'object',
        properties: {
            "tipo": {
                "type": "string",
                "description": "type",
                "example": "Lazer"
            }
        }
    }
}