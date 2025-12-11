-- RETORNA AS MIDIAS PELO ID DO LOG
DELIMITER $$
	
    CREATE PROCEDURE ListarMidiasLog(IN l_id INT)
    BEGIN
    
		DECLARE log_existe INT;
        
        SELECT COUNT(id) FROM tbl_log WHERE id = l_id INTO log_existe;
        
        IF log_existe > 0 THEN
			
			SELECT 
				tbl_log_midia.id,
                tbl_log_midia.link
                FROM tbl_log_midia JOIN
                tbl_log ON tbl_log.id = tbl_log_midia.log_id
                WHERE tbl_log.id = l_id;
            
        ELSE
			
            SELECT CONCAT("ERRO_404: O log ", l_id, " não foi encontrada na base de dados.");
            
        END IF;
    
    END $$

DELIMITER ;

-- REGISTRA UMA MIDIA (FOTO OU VÍDEO)
DELIMITER $$

	CREATE PROCEDURE CriarMidia(
    IN var_link VARCHAR(255),
    IN l_id INT)
    BEGIN
    
		DECLARE log_existe INT;
        
        SELECT COUNT(id) FROM tbl_log WHERE id = l_id INTO log_existe;
        
        IF log_existe > 0 THEN
			
			INSERT INTO tbl_log_midia(
				link,
				log_id
			) VALUES (
				var_link,
				l_id
			);
            
        ELSE
			
            SELECT CONCAT("ERRO_404: O log ", l_id, " não foi encontrada na base de dados.");
            
        END IF;
    
    END $$

DELIMITER ;

-- DELETAR UMA MIDIA
DELIMITER $$

	CREATE PROCEDURE DeletarMidia(IN m_id INT)
    BEGIN
    
		DECLARE midia_existe INT;
        
        SELECT COUNT(id) FROM tbl_log_midia WHERE id = m_id INTO midia_existe;
        
        IF midia_existe > 0 THEN
			
			DELETE FROM tbl_log_midia WHERE id = m_id;
            
        ELSE
			
            SELECT CONCAT("ERRO_404: A midia ", m_id, " não foi encontrada na base de dados.");
            
        END IF;
    
    END $$

DELIMITER ;