module.exports = {
    log: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "descricao": {
                "type": "string",
                "description": "description",
                "example": "Férias nas maldivas, com minha linda companheira no ano de 2025."
            },
            "data": {
                "type": "string",
                "description": "data_inicio",
                "example": "2025-10-24"
            },
            "curtidas": {
                "type": "int",
                "description": "curtidas",
                "example": 0
            },
            "favoritados": {
                "type": "int",
                "description": "favoritados",
                "example": 0
            },
            "viagem": {
                $ref: "#/components/schemas/travel"
            },
            "local": {
                $ref: "#/components/schemas/local"
            }
        }
    },

    logCreate: {
        type: 'object',
        properties: {
            "descricao": {
                "type": "string",
                "description": "description",
                "example": "Férias nas maldivas, com minha linda companheira no ano de 2025."
            },
            "id_collection": {
                "type": "int",
                "description": "collection",
                "example": 1
            },
            "id_local": {
                "type": "int",
                "description": "local",
                "example": 1
            }
        }
    },

    travelGetLog: {

        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "descricao": {
                "type": "string",
                "description": "description",
                "example": "Férias nas maldivas, com minha linda companheira no ano de 2025."
            },
            "data": {
                "type": "string",
                "description": "data_inicio",
                "example": "2025-10-24"
            },
            "curtidas": {
                "type": "int",
                "description": "curtidas",
                "example": 0
            },
            "favoritados": {
                "type": "int",
                "description": "favoritados",
                "example": 0
            },
            "local": {
                $ref: "#/components/schemas/local"
            }
        }

    }
}