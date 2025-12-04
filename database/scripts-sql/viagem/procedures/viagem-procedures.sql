-- RETORNA VIAGENS PELO ID DO USUÁRIO

DELIMITER $$

CREATE PROCEDURE ListarViagensUsuario(IN u_id INT)
BEGIN
	
    DECLARE usuario_existe INT;
    
	SELECT COUNT(id) 
    FROM tbl_usuario 
    WHERE id = u_id
	INTO usuario_existe;
    
    IF usuario_existe > 0 THEN
    
		SELECT 
			tbl_viagem.id as id_viagem,
			tbl_viagem.titulo as viagem_titulo,
			tbl_viagem.data_inicio as data_inicio,
			tbl_viagem.data_fim as data_fim,
			tbl_viagem.thumbnail as thumbnail,
			tbl_viagem.visivel as visivel,
			tbl_tipo_viagem.nome as tipo_viagem
			
			FROM tbl_viagem JOIN tbl_usuario
			ON tbl_viagem.usuario_id = tbl_usuario.id
				
			JOIN tbl_tipo_viagem 
			ON tbl_viagem.tipo_viagem_id = tbl_tipo_viagem.id
			
			WHERE tbl_usuario.id = u_id;
    
    ELSE
    
		SELECT concat("ERRO_404: O usuário", u_id ,"solicitado não foi encontrado na base de dados...");
    
    END IF;
    
END$$

DELIMITER ;

-- RETORNA A VIAGEM PELO ID DO LOG

DELIMITER $$

CREATE PROCEDURE BuscarViagemLogId(IN l_id INT)
BEGIN
	
    SELECT 
	tbl_viagem.id as id_viagem,
	tbl_viagem.titulo,
	tbl_viagem.data_inicio,
	tbl_viagem.data_fim,
	tbl_viagem.thumbnail,
	tbl_viagem.visivel,
	tbl_tipo_viagem.nome as tipo_viagem
            
	FROM tbl_viagem 
    JOIN tbl_log 
    ON tbl_viagem.id = tbl_log.viagem_id
    
    JOIN tbl_tipo_viagem ON
    tbl_viagem.tipo_viagem_id = tbl_tipo_viagem.id
    
    WHERE tbl_log.id = l_id;

END $$

DELIMITER ;

DELIMITER $$

	CREATE PROCEDURE CriarViagem( 
		IN var_titulo VARCHAR(50),
        IN var_data_inicio DATE,
        IN var_data_fim DATE,
        IN var_thumbnail VARCHAR(255),
        IN var_usuario_id INT,
        IN var_tipo_viagem_id INT
    )
    BEGIN
    
		INSERT INTO tbl_viagem (
			titulo,
            data_inicio,
            data_fim,
            thumbnail,
            usuario_id,
            tipo_viagem_id
        ) VALUES (
			var_titulo,
            var_data_inicio,
            var_data_fim,
            var_thumbnail,
            var_usuario_id,
            var_tipo_viagem_id
        );
    
    END $$
    

DELIMITER ;

DELIMITER $$

	CREATE PROCEDURE AtualizarViagem(
		IN v_id INT,
        IN var_titulo VARCHAR(50),
        IN var_data_inicio DATE,
        IN var_data_fim DATE,
        IN var_thumbnail VARCHAR(255),
        IN var_usuario_id INT,
        IN var_tipo_viagem_id INT
    )
    BEGIN
    
		DECLARE viagem_existe INT;
        
        SELECT COUNT(id) FROM tbl_viagem WHERE id = v_id INTO viagem_existe;
    
		IF viagem_existe > 0 THEN
        
			UPDATE tbl_viagem SET
				titulo = var_titulo,
				data_inicio = var_data_inicio,
				data_fim = var_data_fim,
				thumbnail = var_thumbnail,
				usuario_id = var_usuario_id,
				tipo_viagem_id = var_tipo_viagem_id
				
				WHERE id = v_id;
                
		ELSE
        
			SELECT CONCAT("ERRO_404: A viagem ", v_id, " não foi encontrada na base de dados.");
		
        END IF;
    
    END $$

DELIMITER ;

-- ALTERA O STATUS DE VISÍVEL PARA FALSE 
DELIMITER $$
	
    CREATE PROCEDURE AlternarStatusViagemFalse(IN v_id INT)
    BEGIN
    
		DECLARE viagem_existe INT;
        
        SELECT COUNT(id) FROM tbl_viagem WHERE id = v_id INTO viagem_existe;
        
        IF viagem_existe > 0 THEN
			
            UPDATE tbl_viagem SET
				visivel = FALSE
			WHERE tbl_viagem.id = v_id;
            
        ELSE
			
            SELECT CONCAT("ERRO_404: A viagem ", v_id, " não foi encontrada na base de dados.");
            
        END IF;
    
    END $$

DELIMITER ;

-- ALTERA O STATUS DE VISÍVEL PARA TRUE 
DELIMITER $$
	
    CREATE PROCEDURE AlternarStatusViagemTrue(IN v_id INT)
    BEGIN
    
		DECLARE viagem_existe INT;
        
        SELECT COUNT(id) FROM tbl_viagem WHERE id = v_id INTO viagem_existe;
        
        IF viagem_existe > 0 THEN
			
            UPDATE tbl_viagem SET
				visivel = TRUE
			WHERE tbl_viagem.id = v_id;
            
        ELSE
			
            SELECT CONCAT("ERRO_404: A viagem ", v_id, " não foi encontrada na base de dados.");
            
        END IF;
    
    END $$

DELIMITER ;

DELIMITER $$

	CREATE PROCEDURE DeletaViagem(IN v_id INT)
    BEGIN
    
    DECLARE viagem_existe INT;
        
        SELECT COUNT(id) FROM tbl_viagem WHERE id = v_id INTO viagem_existe;
        
        IF viagem_existe > 0 THEN
			
            DELETE FROM tbl_viagem WHERE id = v_id;
            
        ELSE
			
            SELECT CONCAT("ERRO_404: A viagem ", v_id, " não foi encontrada na base de dados.");
            
        END IF;
    
    END $$

DELIMITER ;
