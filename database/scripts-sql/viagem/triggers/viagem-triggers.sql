#DESATIVA LOGS DA VIAGEM

DELIMITER $$
/* Manter como backup, mas existe uma alternativa melhor para isso
	CREATE TRIGGER trg_alterna_status_posts_viagem
    AFTER UPDATE ON tbl_viagem
    FOR EACH ROW
    BEGIN
    
		DECLARE status_viagem BOOLEAN;
        SELECT NEW.visivel INTO status_viagem;
        
        IF status_viagem = FALSE THEN 
            UPDATE tbl_log SET
				visivel = FALSE
			WHERE viagem_id = NEW.id;
            
        ELSE
			UPDATE tbl_log SET
				visivel = TRUE
			WHERE viagem_id = NEW.id;
        
        END IF;
    
    END $$
    
*/
DELIMITER ;

#DELETA LOGS DE UMA VIAGEM QUE ACABOU DE SER DELETADA
DELIMITER $$

	CREATE TRIGGER trg_deleta_logs_viagem
    BEFORE DELETE ON tbl_viagem
    FOR EACH ROW
    BEGIN
		
        DELETE FROM tbl_log WHERE viagem_id = OLD.id;
    
    END $$

DELIMITER ;