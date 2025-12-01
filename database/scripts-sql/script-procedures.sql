-- --------------------------------------------------------
-- PROCEDURES DE INTERAÇÃO
-- --------------------------------------------------------

-- Seguidor
DELIMITER $$

CREATE PROCEDURE criar_relacao_seguidor(
    IN input_seguidor_id INT,
    IN input_seguido_id INT
)
BEGIN 
    DECLARE seguido_existe INT;
    DECLARE seguidor_existe INT;

    -- Verificando existencia de inputs no db
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_seguido_id INTO seguido_existe;
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_seguidor_id INTO seguidor_existe;
    
    -- Caso de erro
    IF seguido_existe = 0 OR seguidor_existe = 0
    THEN
        SELECT "ERRO_404: Este usuário ou seguidor não foi encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: Este usuário ou seguidor não foi encontrado na base de dados';
        */
    ELSE
        -- Inserindo valores
        INSERT INTO tbl_seguidor(seguido_id, seguidor_id, data_inicio)
        VALUES(
            input_seguido_id,
            input_seguidor_id,
            CURRENT_DATE()
        );

        -- Retornando registro
        SELECT * from tbl_seguidor
        WHERE seguido_id = input_seguido_id 
            AND seguidor_id = input_seguidor_id;
    END IF;
END $$
DELIMITER ;