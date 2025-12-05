-- --------------------------------------------------------
-- PROCEDURES SEGUIDOR
-- --------------------------------------------------------
DELIMITER $$
-- Para seguir um usuário
CREATE PROCEDURE CriarRelacaoSeguidor(
    IN input_usuario_id INT,
    IN input_seguidor_id INT
)
BEGIN 
    DECLARE usuario_existe INT;
    DECLARE seguidor_existe INT;
    DECLARE relacao_existe INT;

    -- Verificando existencia de inputs no db
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_usuario_id INTO usuario_existe;
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_seguidor_id INTO seguidor_existe;
    -- Verificando se já existe uma relação cadastrada
    SELECT COUNT(id) FROM tbl_seguidor WHERE usuario_id = input_usuario_id AND seguidor_id = input_seguidor_id INTO relacao_existe;

    -- Caso de erro
    IF usuario_existe = 0 OR seguidor_existe = 0
    THEN
        SELECT "ERRO_404: Este usuário ou seguidor não foi encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: Este usuário ou seguidor não foi encontrado na base de dados';
        */
    ELSEIF relacao_existe = 1
    THEN 
        SELECT "Já existe um registro de relação seguido seguidor entre esses usuários";
    ELSE
        -- Inserindo valores
        INSERT INTO tbl_seguidor(usuario_id, seguidor_id, data_inicio)
        VALUES(
            input_usuario_id,
            input_seguidor_id,
            CURRENT_DATE() 
        );

        -- Retornando registro
        SELECT * from tbl_seguidor
        WHERE usuario_id = input_usuario_id 
            AND seguidor_id = input_seguidor_id;
    END IF;
END $$
-- Para deixar de seguir um usuário
CREATE PROCEDURE RemoverRelacaoSeguidor(
    IN input_usuario_id INT,
    IN input_seguidor INT
)
BEGIN
    DECLARE id_relacao INT DEFAULT 0;

    -- Verificando existencia de relacao
    SELECT id FROM tbl_seguidor WHERE usuario_id = input_usuario_id AND seguidor_id = input_seguidor_id INTO id_relacao;

    -- Caso não exista
    IF id_relacao = 0
        THEN
            SELECT "ERRO_404: O registro de relacao de seguidor com esses ids não foi encontrado" message;
            /*
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'ERRO_404: O registro de relacao de seguidor com esses ids não foi encontrado';
            */
        ELSE
            -- deletando registro
            DELETE FROM tbl_seguidor
            WHERE id = id_relacao;
    END IF;
END$$

-- Para remover todas as relações (tanto de seguidor como sendo seguido)
-- que o usuário está registrado, quando ele for desativado
CREATE PROCEDURE RemoverRelacoesSeguidores(
    IN input_usuario_id INT
)
BEGIN
    DELETE FROM tbl_seguidor
    WHERE usuario_id = input_usuario_id
    OR seguidor_id = input_usuario_id;
END$$

-- Para obter a linha de tempo (Logs cujos autores são seguidos pelo nosso usuario)
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
    (SELECT COUNT(id) FROM tbl_curtida WHERE tbl_curtida.usuario_id = input_usuario_id AND tbl_curtida.log_id = tbl_log.id) AS curtido,
    (SELECT COUNT(id) FROM tbl_favorito WHERE tbl_favorito.usuario_id = input_usuario_id AND tbl_favorito.log_id = tbl_log.id) AS favoritado
    
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

-- Para consultar quem o usuário segue
CREATE PROCEDURE BuscarSeguindo(IN input_usuario_id INT)
BEGIN
    DECLARE usuario_existe INT;

    -- Verificando existencia de inputs no db
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_usuario_id INTO usuario_existe;

    -- Caso de erro
    IF usuario_existe = 0
	THEN
        SELECT "ERRO_404: Este usuário não foi encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: Este usuário não foi encontrado na base de dados';
        */
    ELSE
		SELECT tbl_seguidor.id, 
        tbl_usuario.id AS usuario_seguido_id, tbl_usuario.nome, tbl_usuario.apelido, tbl_usuario.foto_perfil
        FROM tbl_seguidor
        JOIN tbl_usuario ON tbl_seguidor.usuario_id = tbl_usuario.id
        WHERE tbl_seguidor.seguidor_id = input_usuario_id;
	END IF;
END$$

-- Para consultar os seguidores de um usuario
CREATE PROCEDURE BuscarSeguidores(IN input_usuario_id INT)
BEGIN
    DECLARE usuario_existe INT;

    -- Verificando existencia de inputs no db
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_usuario_id INTO usuario_existe;

    -- Caso de erro
    IF usuario_existe = 0
	THEN
        SELECT "ERRO_404: Este usuário não foi encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: Este usuário não foi encontrado na base de dados';
        */
    ELSE
		SELECT tbl_seguidor.id, 
        tbl_usuario.id AS usuario_seguidor_id, tbl_usuario.nome, tbl_usuario.apelido, tbl_usuario.foto_perfil
        FROM tbl_seguidor
        JOIN tbl_usuario ON tbl_seguidor.seguidor_id = tbl_usuario.id
        WHERE tbl_seguidor.usuario_id = input_usuario_id;
	END IF;
END$$
DELIMITER ;
