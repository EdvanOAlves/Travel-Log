module.exports = {

    post: {

        tags: ["EndPoints [LOCAL]"],
        description: 'Cadastra uma local no sistema.',
        operationId: 'inserirLocal(local, contentType)',
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/localCreate'
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
                            $ref: "#/components/schemas/local"
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