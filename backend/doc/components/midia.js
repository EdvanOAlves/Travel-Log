module.exports = {
    midia: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "link": {
                "type": "string",
                "description": "link",
                "example": "http://storagephoto/midia.png"
            },
            "index": {
                "type": "int",
                "description": "index",
                "example": 1
            },
            "id_postagem": {
                $ref: "#/schema/components/log"
            }
        }
    },

    midiaCreate: {
        type: 'object',
        properties: {
            "link": {
                "type": "string",
                "description": "link",
                "example": "http://storagephoto/midia.png"
            },
            "index": {
                "type": "int",
                "description": "index",
                "example": 1
            },
            "id_postagem": {
                "type": "int",
                "description": "foreign key",
                "example": "1"
            }
        }
    }
}