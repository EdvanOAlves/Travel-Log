module.exports = {
    delete: {
        tags: ["EndPoints [FILTRO VIAGEM]"],
        description: 'Deleta um filtro de viagem do sistema.',
        operationId: 'deletarFiltro(id)',
        parameters: [{
            name: "id",
            in: "path",
            description: "ID do filtro",
            required: true,
            schema: {
                type: "int",
                format: "int64"
            }
        }],
        responses: {
            200: {
                description: "Requisição bem sucedida",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/success_delete"
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