
DELIMITER $$

-- BUSCAR LOCAIS VISITADOS POR UM USUÁRIO
CREATE PROCEDURE BuscarLocaisUsuario(
	IN usuario_id INT
)
BEGIN
	DECLARE usuario_existe INT;
    SELECT COUNT(id) FROM tbl_usuario WHERE id = usuario_id INTO usuario_existe;
    
    IF usuario_existe>0 THEN
		SELECT 
        tbl_local.id, tbl_local.nome AS ponto_interesse, 
		tbl_local.cidade, tbl_local.estado, 
        tbl_local.pais_id, tbl_pais.nome AS nome_pais
        FROM tbl_local
        JOIN tbl_pais ON tbl_local.pais_id = tbl_pais.id
        JOIN tbl_log ON tbl_local.id = tbl_log.local_id
        JOIN tbl_viagem ON tbl_log.viagem_id = tbl_viagem.id
        JOIN tbl_usuario ON tbl_viagem.usuario_id = tbl_usuario.id
        WHERE tbl_usuario.id = usuario_id;
    ELSE
		SELECT CONCAT("ERRO_404: O usuário ", usuario_id, " não foi encontrado na base de dados");
	END IF;
END$$

-- BUSCAR PAÍSES VISITADOS POR UM USUÁRIO
CREATE PROCEDURE BuscarPaisesUsuario(
	IN usuario_id INT
)
BEGIN
	DECLARE usuario_existe INT;
    SELECT COUNT(id) FROM tbl_usuario WHERE id = usuario_id INTO usuario_existe;
    
    IF usuario_existe> 0 THEN
		SELECT DISTINCT
        tbl_pais.id, tbl_pais.nome
        FROM tbl_local
        JOIN tbl_pais ON tbl_local.pais_id = tbl_pais.id
        JOIN tbl_log ON tbl_local.id = tbl_log.local_id
        JOIN tbl_viagem ON tbl_log.viagem_id = tbl_viagem.id
        JOIN tbl_usuario ON tbl_viagem.usuario_id = tbl_usuario.id
        WHERE tbl_usuario.id = usuario_id;
    ELSE
		SELECT CONCAT("ERRO_404: O usuário ", usuario_id, " não foi encontrado na base de dados");
	END IF;
END$$

-- CRIA UM LOCAL
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

-- DELETA UM LOCAL
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
