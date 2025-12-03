-- --------------------------------------------------------
-- PROCEDURES SEGUIDOR
-- --------------------------------------------------------
DELIMITER $$
-- Para seguir um usuário
CREATE PROCEDURE criar_relacao_seguidor(
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
    SELECT COUNT(id) FROM tbl_seguidor WHERE usuario_id = input_usuario_id AND seguidor_id = input_seguidor_id INTO relacao_existe

    -- Caso de erro
    IF usuario_existe = 0 OR seguidor_existe = 0
    THEN
        SELECT "ERRO_404: Este usuário ou seguidor não foi encontrado na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: Este usuário ou seguidor não foi encontrado na base de dados';
        */
    ELSEIF relacao_existe = 0
    THEN 
        SELECT "Já existe um registro de relação seguido seguidor entre esses usuários"
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
CREATE PROCEDURE remover_relacao_seguidor(
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
            WHERE id = id_relacao
    END IF;
END$$

-- Para remover todas as relações (tanto de seguidor como sendo seguido)
-- que o usuário está registrado, quando ele for desativado
CREATE PROCEDURE remover_relacoes_seguidores(
    IN input_usuario_id INT
)
BEGIN
    DELETE FROM tbl_seguidor
    WHERE usuario_id = input_usuario_id
    OR seguidor_id = input_usuario_id;
END$$

-- PROCEDURE INACABADA (Essa vai ser bem complicada por sinal)
-- Para obter a linha de tempo (Logs criados pelos usuários que são seguidos pelo nosso usuario)
CREATE PROCEDURE buscar_feed_seguindo(
    IN input_usuario_id INT
)
BEGIN
    DECLARE usuario_existe INT;

    -- Verificando existencia de inputs no db
    SELECT COUNT(id) FROM tbl_usuario WHERE id = input_usuario_id INTO usuario_existe;
    
    -- Validação
    IF usuario_existe = 0
    THEN
        SELECT "ERRO_404: Não foi encontrado nenhum usuário correspondente a esse id" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: Não foi encontrado nenhum usuário correspondente a esse id';
        */
    ELSE
        SELECT IFNULL(
            -- Requisição de dados com base nos seguidores
            (tbl_log.*, 
            MIN(tbl_midia.link), 
            tbl_usuario.id, tbl_usuario.nome, tbl_usuario.nickname, tbl_usuario.foto_perfil
            ), 
            -- fallback, caso não tenha nenhum post de seguidor ele puxa os mais populares:
            view_logs_populares
        ) FROM tbl_log 
        JOIN tbl_viagem
            ON tbl_viagem.id = tbl_log.id
        JOIN tbl_usuario
            ON tbl_usuario.id = tbl_viagem.usuario_id
        JOIN tbl_seguidor
            ON tbl_seguidor.seguidor_id = tbl_usuario.id 
        JOIN tbl_midia
            ON tbl_log.id = tbl_midia.log_id
        WHERE tbl_log.visivel = 1;
    END IF
END$$   

DELIMITER ;
