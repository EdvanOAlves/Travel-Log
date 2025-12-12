module.exports = {
    travel: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "titulo": {
                "type": "string",
                "description": "name",
                "example": "Férias bem legais!!!"
            },
            "data_inicio": {
                "type": "string",
                "description": "data_inicio",
                "example": "2025-10-24"
            },
            "data_fim": {
                "type": "string",
                "description": "data_inicio",
                "example": "2025-10-24"
            },
            "link_thumbnail": {
                "type": "string",
                "description": "thumbnail",
                "example": "http://storage/photo.png"
            },
            "usuario": {
                $ref: "#/components/schemas/usersAlias"
            },
            "tipo_viagem": {
                $ref: "#/components/schemas/filter"
            }
        }
    },

    travelCreate: {
        type: 'object',
        properties: {
            "titulo": {
                "type": "string",
                "description": "name",
                "example": "Férias bem legais!!!"
            },
            "data_inicio": {
                "type": "string",
                "description": "data_inicio",
                "example": "2025-10-24"
            },
            "data_fim": {
                "type": "string",
                "description": "data_inicio",
                "example": "2025-10-24"
            },
            "link_thumbnail": {
                "type": "string",
                "description": "thumbnail",
                "example": "http://storage/photo.png"
            },
            "id_usuario": {
                "type": "int",
                "description": "foreign key",
                "example": 1
            },
            "id_tipo_viagem": {
                "type": "int",
                "description": "foreign key",
                "example": 1
            }
        }
    },

    userGetTravel: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "titulo": {
                "type": "string",
                "description": "name",
                "example": "Férias bem legais!!!"
            },
            "data_inicio": {
                "type": "string",
                "description": "data_inicio",
                "example": "2025-10-24"
            },
            "data_fim": {
                "type": "string",
                "description": "data_inicio",
                "example": "2025-10-24"
            },
            "link_thumbnail": {
                "type": "string",
                "description": "thumbnail",
                "example": "http://storage/photo.png"
            },
            "tipo_viagem": {
                $ref: "#/components/schemas/filter"
            },
            "usuario": {
                $ref: "#/components/schemas/usersAlias"
            },
            "logs": {
                $ref: "#/components/schemas/travelGetLog"
            }
        }
    },

    travelAlias: {
        type: 'object',
        properties: {
            "viagem_id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "titulo": {
                "type": "string",
                "description": "titulo",
                "example": "Férias bem legais!!!"
            },
            "tipo_viagem_id": {
                "type": "int",
                "description": "tipo_viagem_id",
                "example": "Férias bem legais!!!"
            },
            "tipo_viagem": {
                "type": "string",
                "description": "titulo",
                "example": "Férias"
            }
        }
    }
}