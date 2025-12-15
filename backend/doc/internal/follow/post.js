module.exports = {
    post: {
        tags: ["EndPoints [FOLLOW]"],
        description: 'Insere uma relação entre um usuário e outro (seguir)',
        operationId: 'insereSeguidor',
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: '#/components/schemas/followCreate'
                    }
                }
            }
        },
        responses: {
            201: {
                description: "Requisição bem sucedida",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/success_insert"
                        }
                    }
                }
            },
            400: {
                description: "Campo inválido",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/error400"
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