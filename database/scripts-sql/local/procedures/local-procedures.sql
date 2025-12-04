-- CRIA UM LOCAL

DELIMITER $$


	CREATE PROCEDURE CriarLocal(
		IN var_nome VARCHAR(255),
		IN var_estado VARCHAR(75),
		IN var_cidade VARCHAR(75),
		IN p_id INT
	)
	BEGIN
    
		DECLARE pais_existe INT;
        
        SELECT COUNT(id) FROM tbl_pais WHERE id = p_id INTO pais_existe;
        
        IF pais_existe > 0 THEN
				
			INSERT INTO tbl_local(
				nome,
                estado,
                cidade,
                pais_id
            ) VALUES (
				var_nome,
                var_estado,
                var_cidade,
                p_id
            );
            
        ELSE
        
			SELECT concat("ERRO_404: O local ", l_id, " não foi encontrado na base de dados." );
        
        END IF;
    
    END $$

DELIMITER ;

--DELETA UM LOCAL
DELIMITER $$

	CREATE PROCEDURE DeletaLocal(IN lo_id INT)
    BEGIN
		
        DECLARE local_existe INT;
        
        SELECT COUNT(id) FROM tbl_local WHERE id = lo_id INTO local_existe;
        
        IF local_existe > 0 THEN
			
            DELETE FROM tbl_local WHERE id = lo_id;
        
        ELSE
        
			SELECT CONCAT("ERRO_404: O local ", lo_id, " não foi encontrado na base de dados");
        
        END IF;
    
    END $$

DELIMITER ;
