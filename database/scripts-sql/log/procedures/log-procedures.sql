-- --------------------------------------------------------
-- PROCEDURES LOG
-- --------------------------------------------------------

CALL PublicarLog("adsdasd", 6, true, "China", "shangai", "shangai", "monte fuji");

DELIMITER $$

-- Para publicar um log
-- Não vai precisar passar a data
CREATE PROCEDURE PublicarLog(
    IN input_descricao VARCHAR(1500),
    IN input_viagem_id INT,
    IN input_visivel BOOLEAN,
    -- IN local_id INT,
    
    IN input_pais_nome VARCHAR(255),
    IN input_estado VARCHAR(75),
    IN input_cidade VARCHAR(75),
    IN input_nome_local VARCHAR(255)
)
BEGIN 
    DECLARE viagem_existe INT;
    DECLARE created_local_id INT;

    -- Verificando existencia de inputs no db
    SELECT COUNT(id) FROM tbl_viagem WHERE id = input_viagem_id INTO viagem_existe;

    -- Caso de erro
    IF viagem_existe = 0
    THEN
        SELECT "ERRO_404: A viagem escolhida não foi encontrada na base de dados desse usuário" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: A viagem escolhida não foi encontrada na base de dados';
        */
    ELSE
        -- Cadastro de tbl_local
        CALL CriarLocal(input_pais_nome, input_estado, input_cidade, input_nome_local, created_local_id);
        -- Inserindo valores
        INSERT INTO tbl_log(descricao, data_publicacao, visivel, viagem_id, local_id)
        VALUES(
            input_descricao,
            CURRENT_DATE(),
            input_visivel,
            input_viagem_id,
            created_local_id
        );
        -- ISSO NÃO VAI TRATAR MÍDIA
    END IF;
END $$


-- Procedure de Logs mais recentes, para a aba de explorar
CREATE PROCEDURE BuscarLogsRecentes(IN input_usuario_id INT)
BEGIN
    SELECT 
    tbl_usuario.id AS autor_id, 
    tbl_usuario.apelido AS autor_apelido, 
    tbl_usuario.foto_perfil AS autor_foto, 
    
    tbl_log.id AS log_id, 
    tbl_log.descricao AS log_descricao, 
    tbl_log.data_publicacao AS data_postagem, 
    tbl_log.contagem_curtidas AS qtde_curtidas,
    tbl_log.contagem_favoritos AS qtde_favoritos,
    tbl_log.viagem_id,
    tbl_viagem.titulo AS titulo_viagem,
    tbl_tipo_viagem.id AS tipo_viagem_id,
    tbl_tipo_viagem.nome AS tipo_viagem,
    tbl_local.id AS local_id,
    tbl_local.nome AS ponto_interesse,
    tbl_local.cidade AS cidade,
    tbl_local.estado AS estado,
    
    tbl_pais.id AS pais_id,
    tbl_pais.nome AS pais,
    
    -- CAST => Converte o resultado da lógica (1 ou 0) para o padrão JSON do JavaScript, estou utilizando isso pois essa função estava retornando um
    -- BigInt e atrapalhando o consumo de dados no JSON
    CAST(IF((SELECT COUNT(id) FROM tbl_curtida WHERE usuario_id = input_usuario_id AND log_id = tbl_log.id) > 0, true, false) AS JSON) AS curtido,
    CAST(IF((SELECT COUNT(id) FROM tbl_favorito WHERE usuario_id = input_usuario_id AND log_id = tbl_log.id) > 0, true, false) AS JSON) AS favoritado
    
    -- Fontes
    FROM tbl_log
    
    JOIN tbl_viagem ON 
    tbl_log.viagem_id = tbl_viagem.id
    
    JOIN tbl_tipo_viagem ON 
    tbl_viagem.tipo_viagem_id = tbl_tipo_viagem.id
    
    JOIN tbl_usuario ON 
    tbl_viagem.usuario_id = tbl_usuario.id
    
    JOIN tbl_local ON 
    tbl_log.local_id = tbl_local.id
    
    JOIN tbl_pais 
    ON tbl_local.pais_id = tbl_pais.id
    
    WHERE tbl_log.visivel = 1 AND tbl_viagem.visivel = 1 -- Solução nova
    ORDER BY tbl_log.data_publicacao DESC;
    
END $$

DELIMITER ;

-- DESATIVAR LOGS PELO ID DE USUARIO
DELIMITER $$

CREATE PROCEDURE DesativarLogsUsuarioId(IN input_usuario_id INT)
BEGIN	
    DECLARE usuario_existe INT;
        -- Verificando existencia de input no db
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_usuario_id INTO usuario_existe;

    -- Caso de erro
    IF usuario_existe = 0 THEN
        SELECT "ERRO_404: O usuário inserido não foi encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: O usuário inserido não foi encontrado na base de dados';
        */
    ELSE
		UPDATE tbl_log
        JOIN tbl_viagem ON tbl_viagem.id = tbl_log.viagem_id
        JOIN tbl_usuario ON tbl_viagem.usuario_id = tbl_usuario.id
        SET tbl_log.visivel = 0
        WHERE tbl_usuario.id = input_usuario_id;
    END IF;
END$$

DELIMITER ;

-- LISTAR LOGS PELO ID DO USUÁRIO
DELIMITER $$
	
CREATE PROCEDURE ListarLogsUsuario(IN u_id INT)
BEGIN
	DECLARE usuario_existe INT;
	SELECT COUNT(id) FROM tbl_usuario WHERE id = u_id INTO usuario_existe;
	IF usuario_existe > 0 THEN
		SELECT 
			tbl_log.id,
			tbl_log.descricao,
			tbl_log.data_publicacao,
			tbl_log.contagem_curtidas,
			tbl_log.contagem_favoritos,
			tbl_log.visivel,
			tbl_log.viagem_id,
			tbl_log.local_id
		FROM tbl_log
		JOIN tbl_viagem ON tbl_viagem.id = tbl_log.viagem_id
		JOIN tbl_usuario ON tbl_usuario.id = tbl_viagem.usuario_id
		WHERE tbl_usuario.id = u_id;
	ELSE
		SELECT CONCAT("ERRO_404: O usuário ", u_id, " não foi encontrado na base de dados");
	END IF;
    
END $$

DELIMITER ;

DELIMITER $$

-- PARA OBTER CONTEÚDO DO HOME (Logs cujos autores são seguidos pelo usuário em questão)
CREATE PROCEDURE BuscarFeedSeguindo(
    IN input_usuario_id INT
)
BEGIN
SELECT 
    tbl_usuario.id AS autor_id, 
    tbl_usuario.apelido AS autor_apelido, 
    tbl_usuario.foto_perfil AS autor_foto, 
    
    tbl_log.id AS log_id, 
    tbl_log.descricao AS log_descricao, 
    tbl_log.data_publicacao AS data_postagem, 
    tbl_log.contagem_curtidas AS qtde_curtidas,
    tbl_log.contagem_favoritos AS qtde_favoritos,
    tbl_log.viagem_id,
    tbl_viagem.titulo AS titulo_viagem,
    tbl_local.nome AS ponto_interesse,
    tbl_local.cidade AS cidade,
    tbl_local.estado AS estado,
    
    tbl_pais.nome AS pais,
    
    -- Incluindo se o usuario interagiu, seja por curtida ou favorito
    
    CAST(IF((SELECT COUNT(id) FROM tbl_curtida WHERE tbl_curtida.usuario_id = input_usuario_id AND tbl_curtida.log_id = tbl_log.id) > 0, true, false) AS JSON) AS curtido,
	CAST(IF((SELECT COUNT(id) FROM tbl_favorito WHERE tbl_favorito.usuario_id = input_usuario_id AND tbl_favorito.log_id = tbl_log.id) > 0, true, false) AS JSON) AS favoritado
    
    -- Fontes
    FROM tbl_log
    JOIN tbl_viagem ON tbl_log.viagem_id = tbl_viagem.id
    JOIN tbl_usuario ON tbl_viagem.usuario_id = tbl_usuario.id
    JOIN tbl_seguidor ON tbl_usuario.id = tbl_seguidor.usuario_id
    JOIN tbl_local ON tbl_log.local_id = tbl_local.id
    JOIN tbl_pais ON tbl_local.pais_id = tbl_pais.id
    WHERE tbl_log.visivel = 1 
    AND tbl_seguidor.usuario_id = tbl_usuario.id AND tbl_seguidor.seguidor_id = input_usuario_id
    ORDER BY tbl_log.data_publicacao DESC;
END$$

DELIMITER ;

call BuscarFeedSeguindo(1);

DELIMITER $$

-- ATUALIZA LOG
CREATE PROCEDURE AtualizaLog(
	IN l_id INT,
	IN var_descricao VARCHAR(1500),
	IN v_id INT,
	IN var_pais VARCHAR(75), --
	IN var_estado VARCHAR(75), --
	IN var_cidade VARCHAR(75), --
	IN var_nome VARCHAR(255), --
	IN bool_visivel BOOLEAN --
    )
    
BEGIN
	DECLARE log_existe INT;
	DECLARE viagem_existe INT;
	DECLARE local_existe INT;
	DECLARE status_viagem BOOLEAN;
	DECLARE pais_existe INT DEFAULT 0; --
	DECLARE id_local_antigo INT; --
	DECLARE id_local_novo INT; --
        
	SELECT COUNT(id) FROM tbl_log WHERE id = l_id INTO log_existe;
	SELECT COUNT(id) FROM tbl_viagem WHERE id = v_id INTO viagem_existe;
	SELECT COUNT(id) FROM tbl_pais WHERE nome = var_pais INTO pais_existe; --
	SELECT local_id FROM tbl_log WHERE id = l_id INTO id_local_antigo; --
    
    IF log_existe = 0 THEN
		SELECT CONCAT("ERRO_404: O log ", l_id, " não foi encontrado");
	ELSEIF viagem_existe = 0 THEN
		SELECT CONCAT("ERRO_404: A viagem ", v_id, " não foi encontrada");
	ELSEIF pais_existe = 0 THEN
		SELECT CONCAT("ERRO_404: O país ", var_pais, " não foi encontrado na base de dados"); --
	ELSE -- Caso tudo esteja nos conformes:
		UPDATE tbl_log 
        -- Atualizando descrição e viagem
        SET descricao = var_descricao,
			viagem_id = v_id WHERE id = l_id;    
		
        -- Atualizando visibilidade
		SELECT visivel FROM tbl_viagem WHERE id = v_id INTO status_viagem; 
		IF status_viagem = TRUE THEN
		-- Caso a viagem seja pública o log vai aderir a visibilidade escolhida pelo usuario
			UPDATE tbl_log 
				SET visivel = bool_visivel 
				WHERE id = l_id;
		ELSE
			UPDATE tbl_log 
            SET visivel = FALSE -- Caso a viagem não seja pública o log não pode ser
			WHERE id = l_id;
		END IF;
        
        -- Atualizando Local
        CALL CriarLocal(var_pais, var_estado, var_cidade, var_nome, id_local_novo); 
        UPDATE tbl_log SET local_id = id_local_novo WHERE id = l_id;
		DELETE FROM tbl_local WHERE id = id_local_antigo; --
	END IF;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE DeletaLog(IN l_id INT)
    BEGIN
		
        DECLARE log_existe INT;
		DECLARE var_local_id INT;	
            
        SELECT COUNT(id) FROM tbl_log WHERE id = l_id INTO log_existe;
        
        IF	log_existe > 0 THEN
        
				SELECT tbl_local.id FROM tbl_local
				JOIN tbl_log ON
				tbl_local.id = tbl_log.local_id
				WHERE tbl_log.id = l_id
                INTO var_local_id;
        
				DELETE FROM tbl_log WHERE id = l_id;
        ELSE
            SELECT CONCAT("ERRO_404: O log ", l_id," não foi encontrado na base de dados.");
        END IF;
	END $$

DELIMITER ;

DELIMITER $$

	CREATE PROCEDURE BuscarLogsViagemId(IN var_viagem_id INT)
    BEGIN
		
        DECLARE viagem_existe INT;
        
        SELECT COUNT(id) FROM tbl_viagem WHERE id = var_viagem_id INTO viagem_existe;
        
        IF viagem_existe > 0 THEN
        
			SELECT 
				tbl_log.id as id_log,
				tbl_log.descricao,
                tbl_log.data_publicacao,
                tbl_log.contagem_curtidas,
                tbl_log.contagem_favoritos,
                tbl_log.visivel,
                tbl_local.nome as nome_local,
				tbl_local.cidade,
                tbl_local.estado,
                tbl_pais.nome
                
                
                FROM tbl_log
                JOIN tbl_viagem ON
                tbl_viagem.id = tbl_log.viagem_id
                
                JOIN tbl_local ON
                tbl_local.id = tbl_log.local_id
                
				JOIN tbl_pais ON
                tbl_local.pais_id = tbl_pais.id
                
                WHERE tbl_viagem.id = var_viagem_id;
                
        
        ELSE
        
			SELECT CONCAT("ERRO_404: A viagem ", var_viagem_id ," não foi encontrada na base de dados");
        
        END IF;
    
    END $$

DELIMITER ;