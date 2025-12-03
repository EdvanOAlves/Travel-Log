CREATE DATABASE db_travelog_ds2m;
USE db_travelog_ds2m;

-- --------------------------------------------------------
-- ENTIDADES CENTRAIS
-- --------------------------------------------------------

-- REFERENTE A USUARIO
	-- Usuario
CREATE TABLE tbl_usuario(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	apelido VARCHAR(25) NOT NULL,
	email VARCHAR(255) NOT NULL,
	telefone VARCHAR(20) NOT NULL,
	senha VARCHAR(60) NOT NULL,  -- Utilizar do bcrypt em backend para criptografar a senha
	data_cadastro DATE NOT NULL,
	foto_perfil VARCHAR(255) NULL,
	descricao VARCHAR(250) NULL,
	ativo BOOLEAN DEFAULT TRUE
);

-- REFERENTE A LOCAL
	-- País
CREATE TABLE tbl_pais(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(255) NOT NULL
);
	-- Local
CREATE TABLE tbl_local(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(255) NOT NULL,
	estado VARCHAR(75) NULL,
	cidade VARCHAR(75) NULL,
	pais_id INT NOT NULL,

	CONSTRAINT fk_local_pais
	FOREIGN KEY (pais_id) REFERENCES tbl_pais(id)
);

-- REFERENTE AO CONTEÚDO
	-- Tipo de Viagem
CREATE TABLE tbl_tipo_viagem(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(50) NOT NULL
);

	-- Viagem
CREATE TABLE tbl_viagem(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	titulo VARCHAR(50) NOT NULL,
	data_inicio DATE NOT NULL,
	data_fim DATE NULL,
	thumbnail VARCHAR(255) NULL,
	usuario_id INT NOT NULL,
	tipo_viagem_id INT NOT NULL,
	visivel BOOLEAN DEFAULT TRUE,

	CONSTRAINT fk_viagem_usuario
	FOREIGN KEY (usuario_id) REFERENCES tbl_usuario(id),

	CONSTRAINT fk_viagem_tipo_viagem
	FOREIGN KEY (tipo_viagem_id) REFERENCES tbl_tipo_viagem(id)
);

	-- Log
CREATE TABLE tbl_log(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	descricao VARCHAR(1500) NOT NULL,
	data_publicacao DATE NOT NULL,
	contagem_curtidas INT NOT NULL DEFAULT 0,
    contagem_favoritos INT NOT NULL DEFAULT 0,
    visivel BOOLEAN DEFAULT TRUE,
	viagem_id INT NOT NULL,
	local_id INT NOT NULL,

	CONSTRAINT fk_log_viagem
	FOREIGN KEY (viagem_id) REFERENCES tbl_viagem(id),

	CONSTRAINT fk_log_local
	FOREIGN KEY (local_id) REFERENCES tbl_local(id)
);

	-- Mídia (do log)
CREATE TABLE tbl_log_midia(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    link VARCHAR(255) NOT NULL,
    indice INT NOT NULL,
	log_id INT NOT NULL,

	CONSTRAINT fk_midia_log
	FOREIGN KEY (log_id) REFERENCES tbl_log(id);

);


-- REFERENTE A INTERAÇÃO
	-- Comentario
CREATE TABLE tbl_comentario(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    conteudo VARCHAR(255) NOT NULL,
    data_publicacao DATE NOT NULL,
    visivel BOOLEAN DEFAULT TRUE,
    usuario_id INT NOT NULL,
    log_id INT NOT NULL,
    
    CONSTRAINT fk_comentario_usuario
    FOREIGN KEY (usuario_id) REFERENCES tbl_usuario(id),

    CONSTRAINT fk_comentario_log
    FOREIGN KEY (log_id) REFERENCES tbl_log(id)
);
	-- Favorito
CREATE TABLE tbl_favorito(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario_id INT NOT NULL,
    log_id INT NOT NULL,

    CONSTRAINT fk_favorito_usuario
    FOREIGN KEY(usuario_id) REFERENCES tbl_usuario(id),

    CONSTRAINT fk_favorito_log
    FOREIGN KEY (log_id) REFERENCES tbl_log(id)
);

	-- Curtida
CREATE TABLE tbl_curtida(
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    usuario_id INT NOT NULL,
    log_id INT NOT NULL,

    CONSTRAINT fk_curtida_usuario
    FOREIGN KEY(usuario_id) REFERENCES tbl_usuario(id),

    CONSTRAINT fk_curtida_log
    FOREIGN KEY (log_id) REFERENCES tbl_log(id)
);

	-- Seguidor
CREATE TABLE tbl_seguidor(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    data_inicio DATE NOT NULL,
    usuario_id INT NOT NULL, -- O usuario que é seguido
    seguidor_id INT NOT NULL, -- O usuario que segue

	CONSTRAINT fk_seguidor_usuario_seguido
	FOREIGN KEY (usuario_id) REFERENCES tbl_usuario(id);

	CONSTRAINT fk_seguidor_usuario_seguidor
	FOREIGN KEY (seguidor_id) REFERENCES tbl_usuario(id);
);