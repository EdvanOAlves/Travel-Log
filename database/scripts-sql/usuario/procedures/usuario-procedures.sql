
DELIMITER $$

	CREATE PROCEDURE CriarUsuario(
		IN var_nome VARCHAR(100),
        IN var_apelido VARCHAR(25),
        IN var_email VARCHAR(255),
        IN var_telefone VARCHAR(20),
        IN var_senha VARCHAR(60),
        IN var_foto_perfil VARCHAR(255),
        IN var_descricao VARCHAR(250)
    )
    BEGIN
		
		INSERT INTO tbl_usuario(
			nome,
            apelido,
            email,
            telefone,
            senha,
            data_cadastro,
            foto_perfil,
            descricao
        ) VALUES (
			var_nome,
            var_apelido,
            var_email,
            var_telefone,
            var_senha,
            curdate(),
            var_foto_perfil,
            var_descricao
        );
    
    END $$

DELIMITER ;

DELIMITER $$

	CREATE PROCEDURE AtualizaUsuario(
			IN u_id INT,
			IN var_nome VARCHAR(100),
			IN var_apelido VARCHAR(25),
			IN var_email VARCHAR(255),
			IN var_telefone VARCHAR(20),
			IN var_senha VARCHAR(60),
			IN var_foto_perfil VARCHAR(255),
			IN var_descricao VARCHAR(250),
			IN var_ativo BOOLEAN
        )
    BEGIN
    
		DECLARE usuario_existe INT;
        
        SELECT COUNT(id) FROM tbl_usuario WHERE id = u_id INTO usuario_existe;
        
        IF usuario_existe > 0 THEN
			
            UPDATE tbl_usuario SET
				nome = var_nome,
                apelido = var_apelido,
                email = var_email,
                telefone = var_telefone,
                senha = var_senha,
                foto_perfil = var_foto_perfil,
                descricao = var_descricao,
                ativo = var_ativo
			WHERE tbl_usuario.id = u_id;
            
        ELSE
			
            SELECT CONCAT("ERRO_404: A usuario ", u_id, " não foi encontrada na base de dados.");
            
        END IF;
    
    END $$	

DELIMITER ;