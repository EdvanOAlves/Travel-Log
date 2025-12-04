DELIMITER $$
CREATE TRIGGER trg_atualizar_favoritos_insert
AFTER INSERT ON tbl_favorito FOR EACH ROW
BEGIN
	DECLARE numero_favoritos INT;
    
    SELECT COUNT(id) INTO numero_favoritos FROM tbl_favorito WHERE log_id = NEW.log_id; 
	
	UPDATE tbl_log SET contagem_favoritos = numero_favoritos
	WHERE id = NEW.log_id;
END$$	
DELIMITER ;

DELIMITER $$
CREATE TRIGGER trg_atualizar_favoritos_delete
AFTER DELETE ON tbl_favorito FOR EACH ROW
BEGIN
	DECLARE numero_favoritos INT;
    
    SELECT COUNT(id) INTO numero_favoritos FROM tbl_favorito WHERE log_id = OLD.log_id; 

    UPDATE tbl_log SET contagem_favoritos = numero_favoritos
	WHERE id = OLD.log_id;
END$$	
DELIMITER ;