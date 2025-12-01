-- --------------------------------------------------------
-- PROCEDURES DE INTERAÇÃO
-- --------------------------------------------------------

-- Seguidor
DELIMITER $$

CREATE PROCEDURE criar_relacao_seguidor(
    IN input_usuario_id INT,
    IN input_seguidor_id INT
)
BEGIN 
    DECLARE usuario_existe INT;
    DECLARE seguidor_existe INT;

    -- Verificando existencia de inputs no db
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_usuario_id INTO usuario_existe;
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_seguidor_id INTO seguidor_existe;
    
    -- Caso de erro
    IF usuario_existe = 0 OR seguidor_existe = 0
    THEN
        SELECT "ERRO_404: Este usuário ou seguidor não foi encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: Este usuário ou seguidor não foi encontrado na base de dados';
        */
    ELSE
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
DELIMITER ;