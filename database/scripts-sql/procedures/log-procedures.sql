-- --------------------------------------------------------
-- PROCEDURES LOG
-- --------------------------------------------------------
DELIMITER $$
-- Para publicar um log
CREATE PROCEDURE publicar_log(
    IN descricao,
    IN data_publicacao DATE DEFAULT '1000-01-01', -- Default é um valor para ser substituido por current_date
    IN viagem_id INT,
    -- IN local_id INT,
    /* Vai depender de como vai ficar o procedure de local e como o back vai preferir, vou fazer a procedure
    incluindo dados de local pra ficar completo, qualquer coisa é só apagar */
    IN nome_local VARCHAR(255),
    IN estado VARCHAR(75),
    IN cidade VARCHAR(75),
    IN pais_nome VARCHAR(255)
)
BEGIN 
    DECLARE viagem_existe INT;

    -- Verificando existencia de inputs no db
    SELECT COUNT(id) FROM tbl_viagem WHERE id = input_viagem_id INTO viagem_existe;

    -- Caso de erro
    IF viagem_existe = 0
    THEN
        SELECT "ERRO_404: A viagem escolhida não foi encontrada na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: Este usuário ou seguidor não foi encontrado na base de dados';
        */
    ELSE
        SELECT "Já existe um registro de relação seguido seguidor entre esses usuários"

        -- Inserindo valores
        INSERT INTO tbl_seguidor(usuario_id, seguidor_id, data_inicio)
        VALUES(
            input_usuario_id,
            input_seguidor_id,
            CURRENT_DATE() 
        );

        -- Retornando registro
        SELECT * from tbl_seguidor
        WHERE usuario_id = input_usuario_id 
            AND seguidor_id = input_seguidor_id;
    END IF;
END $$

-- View de Logs mais populares, quando o usuário não seguir ninguém
-- Buscar posts de um usuário, com midia inclusa
-- Atualizar Log com edições
-- desativar Log (Porque deletar é ruim)
-- esconder logs por id de usuario (para quando este tiver o perfil desativado) 

DELIMITER ;
