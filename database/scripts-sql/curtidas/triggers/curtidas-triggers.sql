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