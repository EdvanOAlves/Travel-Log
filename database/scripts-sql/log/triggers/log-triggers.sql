
#DELETA TODAS AS MIDIAS RELACIONADAS AO LOG DELETADO

DELIMITER $$

	CREATE TRIGGER trg_deleta_midias_log
    BEFORE DELETE ON tbl_log
    FOR EACH ROW
    BEGIN
		
        DELETE FROM tbl_log_midia WHERE log_id = OLD.id;
    
    END $$
    
# DELETA O LOCAL ASSOCIADO AO LOG DELETADO
	CREATE TRIGGER trg_deleta_local_log
    BEFORE DELETE ON tbl_log
    FOR EACH ROW
    BEGIN
        DELETE FROM tbl_local WHERE id = OLD.local_id;
    END $$

# DELETA TODOS OS COMENTÁRIOS AO LOG DELETADO
	CREATE TRIGGER trg_deleta_comentarios_log
    BEFORE DELETE ON tbl_log
    FOR EACH ROW
    BEGIN
		
        DELETE FROM tbl_comentario WHERE log_id = OLD.id;
    END $$
DELIMITER ;