DELIMITER $$

	CREATE TRIGGER trg_desativa_viagens_usuario
    BEFORE UPDATE ON tbl_usuario
    FOR EACH ROW
    BEGIN
    
		DECLARE status_usuario BOOLEAN;
        
        SELECT ativo FROM tbl_usuario WHERE id = NEW.id INTO status_usuario;
    
		IF status_usuario = FALSE THEN
        
			UPDATE tbl_viagem SET
				visivel = FALSE
			WHERE usuario_id = NEW.id;
        
        END IF;
    
    END $$

DELIMITER ;

DELIMITER $$

	CREATE TRIGGER trg_deleta_viagens_usuario
    BEFORE DELETE ON tbl_usuario
    FOR EACH ROW
    BEGIN
    
		DELETE FROM tbl_viagem WHERE usuario_id = OLD.id;
            
    END $$

DELIMITER ;