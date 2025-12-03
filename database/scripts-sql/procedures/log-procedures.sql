-- --------------------------------------------------------
-- PROCEDURES LOG
-- --------------------------------------------------------
DELIMITER $$
-- Para publicar um log
CREATE PROCEDURE publicar_log(
    IN input_descricao VARCHAR(1500),
    IN input_data_publicacao DATE DEFAULT '1000-01-01', -- Default é um valor para ser substituido por current_date
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

    -- Verificando existencia de inputs no db
    SELECT COUNT(id) FROM tbl_viagem WHERE id = input_viagem_id INTO viagem_existe;

    -- Caso de erro
    IF viagem_existe = 0
    THEN
        SELECT "ERRO_404: A viagem escolhida não foi encontrada na base de dados" message;
        /*
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'ERRO_404: A viagem escolhida não foi encontrada na base de dados';
        */
    ELSE
        DECLARE local_id INT DEFAULT 0; -- Precisa de uma validação do local?
        -- Cadastro de tbl_local
        CALL publicar_local(input_pais_nome, input_estado, input_cidade, input_nome_local) INTO created_local_id;
            --Essa função deve retornar o id de local
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
CREATE PROCEDURE buscar_logs_recentes(IN id_usuario)
BEGIN
    SELECT 
    tbl_usuario.id AS usuario_id, tbl_usuario.apelido AS usuario_apelido, tbl_usuario.foto_perfil AS usuario_foto, 
    tbl_log.*,
    curtido
    FROM tbl_log
    JOIN tbl_viagem ON tbl_log.id_viagem = tbl_viagem.id
    JOIN tbl_usuario ON tbl_viagem.usuario_id = tbl_usuario.id
    WHERE tbl_log.visivel = 1
    ORDER BY tbl_log.data_publicacao;
END $$

-- Buscar posts de um usuário, com midia inclusa
-- Atualizar Log com edições
-- desativar Log (Porque deletar é ruim)
-- esconder logs por id de usuario (para quando este tiver o perfil desativado) 

DELIMITER ;
