-- Procedure para alternar a relação dos likes
DELIMITER $$
CREATE PROCEDURE altenar_relacao_likes(
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

-- Triggers para contagem dos Likes após um insert e delete
DELIMITER $$
CREATE TRIGGER trg_atualizar_likes_insert
AFTER INSERT ON tbl_curtida FOR EACH ROW
BEGIN
	DECLARE numero_curtidas INT;
    
    SELECT COUNT(id) INTO numero_curtidas FROM tbl_curtida WHERE log_id = NEW.log_id; 

    UPDATE tbl_log SET contagem_curtidas = numero_curtidas
	WHERE id = NEW.log_id;
END$$	
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_atualizar_likes_delete
AFTER DELETE ON tbl_curtida FOR EACH ROW
BEGIN
	DECLARE numero_curtidas INT;
    
    SELECT COUNT(id) INTO numero_curtidas FROM tbl_curtida WHERE log_id = OLD.log_id; 

    UPDATE tbl_log SET contagem_curtidas = numero_curtidas
	WHERE id = OLD.log_id;
END$$	
DELIMITER ;