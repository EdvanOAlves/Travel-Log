-- --------------------------------------------------------
-- PROCEDURES LOG
-- --------------------------------------------------------
DELIMITER $$
-- Para publicar um log
-- Não vai precisar passar a data
CREATE PROCEDURE publicar_log(
    IN input_descricao VARCHAR(1500),
    IN input_viagem_id INT,
    IN input_visivel BOOLEAN,
    -- IN local_id INT,
    /* Vai depender de como vai ficar o procedure de local e como o back vai preferir, vou fazer a procedure
    incluindo dados de local pra ficar completo, qualquer coisa é só apagar */
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
        CALL publicar_local(input_pais_nome, input_estado, input_cidade, input_nome_local, created_local_id);
            -- TODO: Alinhar com a procedure de publicar local, ESPECIALMENTE o created_local_id
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
CREATE PROCEDURE buscar_logs_recentes(IN input_usuario_id INT)
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
    (SELECT COUNT(id) FROM tbl_curtida WHERE tbl_curtida.usuario_id = input_usuario_id AND tbl_curtida.log_id = tbl_log.id) AS curtido,
    (SELECT COUNT(id) FROM tbl_favorito WHERE tbl_favorito.usuario_id = input_usuario_id AND tbl_favorito.log_id = tbl_log.id) AS favoritado
    
    -- Fontes
    FROM tbl_log
    JOIN tbl_viagem ON tbl_log.viagem_id = tbl_viagem.id
    JOIN tbl_usuario ON tbl_viagem.usuario_id = tbl_usuario.id
    -- JOIN tbl_curtida ON tbl_curtida.usuario_id = input_usuario_id
    JOIN tbl_local ON tbl_log.local_id = tbl_local.id
    JOIN tbl_pais ON tbl_local.pais_id = tbl_pais.id
    WHERE tbl_log.visivel = 1
    ORDER BY tbl_log.data_publicacao DESC;
END $$

CREATE PROCEDURE desativar_logs(IN input_usuario_id INT)
BEGIN	
    DECLARE usuario_existe INT;
        -- Verificando existencia de input no db
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_usuario_id INTO usuario_existe;

    -- Caso de erro
    IF usuario_existe = 0
    THEN
        SELECT "ERRO_404: O usuário inserido não foi encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: O usuário inserido não foi encontrado na base de dados';
        */
    ELSE
		UPDATE tbl_log
        SET visivel = 0
        WHERE usuario_id = input_usuario_id;
    END IF;
END$$

