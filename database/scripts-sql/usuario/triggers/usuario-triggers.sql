DELIMITER $$

CREATE TRIGGER trg_desativa_viagens_usuario
    BEFORE UPDATE ON tbl_usuario
    FOR EACH ROW
    BEGIN
    
		DECLARE status_usuario BOOLEAN;
        
        SELECT ativo FROM tbl_usuario WHERE id = NEW.id INTO status_usuario;
    
		IF status_usuario = FALSE THEN
        
			UPDATE tbl_viagem SET
				visivel = FALSE
			WHERE usuario_id = NEW.id;
        
        END IF;
    
    END $$
    
CREATE TRIGGER trg_deleta_relacoes_seguidor_usuario
    BEFORE DELETE ON tbl_usuario
    FOR EACH ROW
    BEGIN
		DELETE FROM tbl_viagem WHERE usuario_id = OLD.id;
    END $$

CREATE TRIGGER trg_desativa_comentarios_usuario
	BEFORE DELETE ON tbl_usuario
    FOR EACH ROW
    BEGIN
		UPDATE tbl_comentario 
        SET visivel = 0
        WHERE usuario_id = OLD.id;
	END $$

CREATE TRIGGER tgr_cria_viagem_default_usuario
	AFTER INSERT ON tbl_usuario
    FOR EACH ROW
    BEGIN
    INSERT INTO tbl_viagem(titulo, data_inicio, usuario_id, tipo_viagem_id)
    VALUES('Férias Bem Legais', CURRENT_DATE(), NEW.id, 4);
END $$
select * from tbl_tipo_viagem$$

DELIMITER ;