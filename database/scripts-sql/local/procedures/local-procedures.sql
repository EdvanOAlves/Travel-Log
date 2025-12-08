-- CRIA UM LOCAL
DELIMITER $$
	CREATE PROCEDURE CriarLocal(
		IN var_pais VARCHAR(75),
		IN var_estado VARCHAR(75),
		IN var_cidade VARCHAR(75),
		IN var_nome VARCHAR(255),
        OUT local_id INT
	)
	BEGIN
		DECLARE pais_id INT DEFAULT 0;
        SELECT (id) FROM tbl_pais WHERE nome = var_pais INTO pais_id;
        IF pais_id > 0 THEN
			INSERT INTO tbl_local(
				nome,
                estado,
                cidade,
                pais_id
            ) VALUES (
				var_nome,
                var_estado,
                var_cidade,
                pais_id
            );
			SET local_id = LAST_INSERT_ID();
        ELSE
			SELECT concat("ERRO_404: O país ", var_pais, " não foi encontrado na base de dados.");
        END IF;
    END $$

DELIMITER ;

-- DELETA UM LOCAL
DELIMITER $$
	CREATE PROCEDURE DeletaLocal(IN input_local_id INT)
    BEGIN
		
        DECLARE local_existe INT;
        SELECT COUNT(id) FROM tbl_local WHERE id = input_local_id INTO local_existe;
        
        IF local_existe > 0 THEN
			
            DELETE FROM tbl_local WHERE id = input_local_id;
        ELSE
			SELECT CONCAT("ERRO_404: O local ", input_local_id, " não foi encontrado na base de dados");
        END IF;
    END $$
DELIMITER ;
