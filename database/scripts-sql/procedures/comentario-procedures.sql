-- --------------------------------------------------------
-- PROCEDURES SEGUIDOR
-- --------------------------------------------------------
DELIMITER $$
-- Criar Comentário
CREATE PROCEDURE criar_comentario(
	input_conteudo VARCHAR(255),
    IN input_usuario_id INT,
    IN input_log_id INT
)
BEGIN
	DECLARE log_existe INT;
    DECLARE usuario_existe INT;
        -- Verificando existencia de inputs no db
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_usuario_id INTO usuario_existe;
    SELECT COUNT(id) FROM tbl_log WHERE id = input_log_id INTO log_existe;

    -- Caso de erro
    IF usuario_existe = 0 OR log_existe = 0
    THEN
        SELECT "ERRO_404: O usuário e(ou) seguidor inseridos não foram encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: O usuário e(ou) seguidor inseridos não foram encontrado na base de dados';
        */
    ELSE
		INSERT INTO tbl_comentario(conteudo, data_publicacao, usuario_id, log_id)
		VALUES (input_conteudo, CURRENT_DATE(), input_usuario_id, input_log_id);
	END IF;
END$$

CALL criar_comentario("Olá mundo!", 1, 31)$$
SELECT * FROM tbl_log$$
SELECT * FROM tbl_usuario$$
SELECT * FROM tbl_comentario$$

-- Puxar comentários de um log
-- Deletar um comentário por id
-- deletar comentários por id de usuário (para desativação)

DELIMITER $$