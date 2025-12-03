-- --------------------------------------------------------
-- PROCEDURES SEGUIDOR
-- --------------------------------------------------------
DELIMITER $$
-- Criar Comentário
CREATE PROCEDURE publicar_comentario(
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

-- Puxar comentários de um log
CREATE PROCEDURE buscar_comentarios_log(
	IN input_log_id INT
)
BEGIN
	DECLARE log_existe INT;
    
    SELECT COUNT(id) FROM tbl_log WHERE id = input_log_id INTO log_existe;
    IF log_existe = 0
    THEN
        SELECT "ERRO_404: O log inserido não foi encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: O log inserido não foi encontrado na base de dados';
        */
    ELSE
        SELECT 
		tbl_comentario.usuario_id AS autor_id,
    
		tbl_usuario.apelido AS autor_apelido,
		tbl_usuario.foto_perfil AS autor_foto,
    
		tbl_comentario.id AS comentario_id,
		tbl_comentario.conteudo AS comentario_conteudo,
		tbl_comentario.data_publicacao
    
		FROM tbl_comentario
		JOIN tbl_usuario ON tbl_usuario.id = tbl_comentario.usuario_id
		WHERE tbl_comentario.log_id = input_log_id AND tbl_comentario.visivel = 1
		ORDER BY data_publicacao;
	END IF;
END$$ 

-- Desativar um comentário por id
CREATE PROCEDURE desativar_comentario(IN input_comentario_id INT)
BEGIN
	DECLARE comentario_existe INT;
    -- Verificando a existencia do comentario
    SELECT COUNT(id) FROM tbl_comentario WHERE id = input_comentario_id INTO comentario_existe;
    -- Caso de erro
    IF comentario_existe = 0
    THEN
        SELECT "ERRO_404: O comentario inserido não foi encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: O comentario inserido não foi encontrado na base de dados';
        */
	ELSE 
		UPDATE tbl_comentario
        SET visivel = 0
        WHERE id = input_comentario_id;
	END IF;
END$$

-- desativar comentários por id de usuário (para desativação de usuário)
CREATE PROCEDURE desativar_comentarios(IN input_usuario_id INT)
BEGIN	
    DECLARE usuario_existe INT;
        -- Verificando existencia de input no db
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_usuario_id INTO usuario_existe;

    -- Caso de erro
    IF usuario_existe = 0
    THEN
        SELECT "ERRO_404: O usuário inserido não foi encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: O usuário inserido não foi encontrado na base de dados';
        */
    ELSE
		UPDATE tbl_comentario
        SET visivel = 0
        WHERE usuario_id = input_usuario_id;
    END IF;
END$$

DELIMITER ;