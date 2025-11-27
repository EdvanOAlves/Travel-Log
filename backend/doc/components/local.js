module.exports = {
    local: {
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
                "example": "Masjid Al-Sultan Muhammad Thakurufaanu Al-Auzam"
            },
            "estado": {
                "type": "string",
                "description": "estado",
                "example": "Malé"
            },
            "cidade": {
                "type": "string",
                "description": "cidade",
                "example": "Malé"
            },
            "pais": {
                $ref: "#/components/schemas/pais"
            }
        }
    },

    localCreate: {
        type: 'object',
        properties: {
            "nome": {
                "type": "string",
                "description": "nome",
                "example": "SENAI Prof Vicente Amato"
            },
            "estado": {
                "type": "string",
                "description": "estado",
                "example": "São Paulo"
            },
            "cidade": {
                "type": "string",
                "description": "cidade",
                "example": "Jandira"
            },
            "id_pais": {
                "type": "int",
                "description": "id",
                "example": 1
            }
        }
    }
}