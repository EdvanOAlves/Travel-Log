DELIMITER $$
CREATE PROCEDURE AltenarRelacaoLikes(
		IN input_log_id INT,
        IN input_usuario_id INT
)
BEGIN
	DECLARE log_existe INT;
    DECLARE usuario_existe INT;
    DECLARE curtida_existe INT;
    
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_usuario_id INTO usuario_existe;
    SELECT COUNT(id) FROM tbl_log WHERE id = input_log_id INTO log_existe;
    SELECT COUNT(id) FROM tbl_curtida WHERE usuario_id = input_usuario_id AND log_id = input_log_id INTO curtida_existe;
    
    IF usuario_existe = 0 OR log_existe = 0
    THEN
		SELECT "ERROR_404: Usuário ou Log não foi encontrado na base de dados" MESSAGE;
	ELSEIF curtida_existe = 1
    THEN
		DELETE FROM tbl_curtida WHERE usuario_id = input_usuario_id AND log_id = input_log_id;
    ELSEIF curtida_existe = 0
    THEN
		INSERT INTO tbl_curtida(usuario_id, log_id)
        VALUES(input_usuario_id, input_log_id);
    END IF;
END $$
DELIMITER ;