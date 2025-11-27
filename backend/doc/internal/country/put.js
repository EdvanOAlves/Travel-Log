module.exports = {
    put: {

        tags: ["EndPoints [PAÍS]"],
        description: 'Atualiza um país do sistema.',
        operationId: 'atualizarPais(id, country, contentType)',
        parameters: [{
            name: "id",
            in: "path",
            description: "ID do país",
            required: true,
            schema: {
                type: "int",
                format: "int64"
            }
        }],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/paisCreate'
                    }
                }
            }
        },
        responses: {
            200: {
                description: "Requisição bem sucedida",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/success_update"
                        }
                    }
                }
            },
            404: {
                description: "Não encontrado",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error404"
                        }
                    }
                }
            },
            415: {
                description: "Tipos de dados invalidos.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error415"
                        }
                    }
                }
            },
            500: {
                description: "Erros internos",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error500_controller"
                        }
                    }
                }
            },
            500: {
                description: "Erros internos",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error500_model"
                        }
                    }
                }
            }
        }
    }
}