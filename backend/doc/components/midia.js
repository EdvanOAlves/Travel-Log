module.exports = {
    midia: {
        type: 'object',
        properties: {
            "midia_id": {
                "type": "int",
                "description": "midia_id",
                "example": 1
            },
            "link": {
                "type": "string",
                "description": "link",
                "example": "http://storagephoto/midia.png"
            }
        }
    },

    midiaCreate: {
        type: 'object',
        properties: {
            "link": {
                "type": "string",
                "description": "link",
                "example": "http://storagephoto/minha_familia.png"
            }
        }
    }
}