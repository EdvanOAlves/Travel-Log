
#DELETA TODAS AS MIDIAS RELACIONADAS AO LOG DELETADO

DELIMITER $$

	CREATE TRIGGER trg_deleta_midias_log
    BEFORE DELETE ON tbl_log
    FOR EACH ROW
    BEGIN
		
        DELETE FROM tbl_log_midia WHERE log_id = OLD.id;
    
    END $$

DELIMITER ;

DELIMITER $$

	CREATE TRIGGER trg_deleta_comentarios_log
    BEFORE DELETE ON tbl_log
    FOR EACH ROW
    BEGIN
		
        DELETE FROM tbl_comentario WHERE log_id = OLD.id;
    
    END $$

DELIMITER ;