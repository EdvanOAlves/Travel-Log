INSERT INTO tbl_usuario 
(nome, apelido, email, telefone, senha, data_cadastro, foto_perfil, descricao, ativo)
VALUES
('João Silva', 'joaos', 'joao.silva@email.com', '(11)91234-5678', '$2a$10$abc123', '2025-01-10', 'joao.jpg', 'Viajante apaixonado por aventuras', TRUE),
('Maria Oliveira', 'mari', 'maria.oliveira@email.com', '(11)92345-6789', '$2a$10$abc123', '2025-01-11', 'maria.png', 'Ama conhecer novas culturas', TRUE),
('Carlos Souza', 'carlito', 'carlos.souza@email.com', '(11)93456-7890', '$2a$10$abc123', '2025-01-12', NULL, 'Explorador urbano', TRUE),
('Ana Costa', 'aninha', 'ana.costa@email.com', '(11)94567-8901', '$2a$10$abc123', '2025-01-13', 'ana.jpg', 'Curiosa por natureza', TRUE),
('Pedro Santos', 'pedrinho', 'pedro.santos@email.com', '(11)95678-9012', '$2a$10$abc123', '2025-01-14', NULL, 'Ama trilhas e montanhas', TRUE),
('Juliana Lima', 'ju', 'juliana.lima@email.com', '(11)96789-0123', '$2a$10$abc123', '2025-01-15', 'juliana.png', 'Fotógrafa de viagens', TRUE),
('Ricardo Alves', 'ric', 'ricardo.alves@email.com', '(11)97890-1234', '$2a$10$abc123', '2025-01-16', NULL, 'Historiador e mochileiro', TRUE),
('Fernanda Rocha', 'fer', 'fernanda.rocha@email.com', '(11)98901-2345', '$2a$10$abc123', '2025-01-17', 'fernanda.jpg', 'Apaixonada por praias', TRUE),
('Lucas Martins', 'luc', 'lucas.martins@email.com', '(11)99012-3456', '$2a$10$abc123', '2025-01-18', NULL, 'Geek viajante', TRUE),
('Patrícia Gomes', 'paty', 'patricia.gomes@email.com', '(11)90123-4567', '$2a$10$abc123', '2025-01-19', 'patricia.png', 'Ama gastronomia local', TRUE);


INSERT INTO tbl_pais (nome)
VALUES
('Brasil'),
('Argentina'),
('Chile'),
('Uruguai'),
('Peru'),
('Colômbia'),
('México'),
('Estados Unidos'),
('Canadá'),
('Portugal');

INSERT INTO tbl_local (nome, estado, cidade, pais_id)
VALUES
('Praia de Copacabana', 'Rio de Janeiro', 'Rio de Janeiro', 1),   -- Brasil
('Avenida Paulista', 'São Paulo', 'São Paulo', 1),                -- Brasil
('Casa Rosada', 'Buenos Aires', 'Buenos Aires', 2),               -- Argentina
('Cerro San Cristóbal', 'Región Metropolitana', 'Santiago', 3),   -- Chile
('Teatro Solís', 'Montevideo', 'Montevideo', 4),                  -- Uruguai
('Machu Picchu', 'Cusco', 'Aguas Calientes', 5),                  -- Peru
('Castillo de San Felipe', 'Cartagena', 'Cartagena', 6),           -- Colômbia
('Chichén Itzá', 'Yucatán', 'Tinum', 7),                          -- México
('Central Park', 'Nova Iorque', 'Nova Iorque', 8),                -- Estados Unidos
('CN Tower', 'Ontário', 'Toronto', 9);                            -- Canadá

INSERT INTO tbl_tipo_viagem (nome)
VALUES
('Turismo Cultural'),
('Turismo de Aventura'),
('Turismo Gastronômico'),
('Turismo Religioso'),
('Turismo de Negócios'),
('Turismo de Lazer'),
('Turismo de Saúde'),
('Turismo Rural'),
('Turismo de Estudos'),
('Turismo de Compras');

INSERT INTO tbl_viagem (titulo, data_inicio, data_fim, thumbnail, usuario_id, tipo_viagem_id, visivel)
VALUES
('Explorando o Rio', '2025-02-01', '2025-02-10', 'rio.jpg', 1, 2, TRUE),          -- João, Turismo de Aventura
('Cultura em Lisboa', '2025-03-05', '2025-03-15', 'lisboa.png', 2, 1, TRUE),     -- Maria, Turismo Cultural
('Negócios em NY', '2025-04-01', '2025-04-07', 'ny.jpg', 3, 5, TRUE),            -- Carlos, Turismo de Negócios
('Trilhas no Chile', '2025-05-10', '2025-05-20', 'chile.jpg', 4, 2, TRUE),       -- Ana, Turismo de Aventura
('Praias do México', '2025-06-01', '2025-06-12', 'mexico.jpg', 5, 6, TRUE),      -- Pedro, Turismo de Lazer
('Estudos em Toronto', '2025-07-01', '2025-07-30', 'toronto.png', 6, 9, TRUE),   -- Juliana, Turismo de Estudos
('Gastronomia Peruana', '2025-08-05', '2025-08-15', 'peru.jpg', 7, 3, TRUE),     -- Ricardo, Turismo Gastronômico
('Compras em Miami', '2025-09-01', '2025-09-05', 'miami.png', 8, 10, TRUE),      -- Fernanda, Turismo de Compras
('Rural em Minas', '2025-10-10', '2025-10-20', 'minas.jpg', 9, 8, TRUE),         -- Lucas, Turismo Rural
('Relax em Algarve', '2025-11-01', '2025-11-10', 'algarve.png', 10, 6, TRUE);    -- Patrícia, Turismo de Lazer

INSERT INTO tbl_log (descricao, data_publicacao, contagem_curtidas, contagem_favoritos, visivel, viagem_id, local_id)
VALUES
('Primeiro dia explorando Copacabana, praia lotada e clima perfeito!', '2025-02-02', 120, 45, TRUE, 1, 1),
('Passeio cultural pela Casa Rosada, muita história e arquitetura incrível.', '2025-03-06', 85, 30, TRUE, 2, 3),
('Reunião de negócios na Times Square, cidade nunca dorme.', '2025-04-02', 60, 20, TRUE, 3, 9),
('Trilha até o topo do Cerro San Cristóbal, vista maravilhosa de Santiago.', '2025-05-11', 95, 40, TRUE, 4, 4),
('Dia relaxante nas praias de Cancún, águas cristalinas e sol forte.', '2025-06-02', 150, 70, TRUE, 5, 8),
('Primeira semana de estudos em Toronto, conhecendo a CN Tower.', '2025-07-05', 40, 15, TRUE, 6, 10),
('Experiência gastronômica inesquecível em Cusco, sabores únicos do Peru.', '2025-08-06', 110, 50, TRUE, 7, 6),
('Compras na 5th Avenue em NY, lojas incríveis e muita movimentação.', '2025-09-02', 200, 90, TRUE, 8, 9),
('Visita ao interior de Minas, contato direto com a vida rural.', '2025-10-11', 70, 25, TRUE, 9, 2),
('Relaxando nas praias do Algarve, paisagens paradisíacas.', '2025-11-02', 130, 55, TRUE, 10, 7);

INSERT INTO tbl_log_midia (link, indice, log_id)
VALUES
('copacabana1.jpg', 1, 1),
('copacabana2.jpg', 2, 1),
('casa_rosada1.png', 1, 2),
('times_square1.jpg', 1, 3),
('cerro_san_cristobal1.jpg', 1, 4),
('cancun_beach1.jpg', 1, 5),
('cn_tower1.png', 1, 6),
('cusco_food1.jpg', 1, 7),
('miami_shopping1.jpg', 1, 8),
('minas_rural1.jpg', 1, 9);

UPDATE tbl_log_midia SET 
link = 'https://tse2.mm.bing.net/th/id/OIP.wMKPZBaOp5N36Pl6UmDYswHaE7?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3'
WHERE id = 2;

SELECT * FROM tbl_log_midia;

INSERT INTO tbl_comentario (conteudo, data_publicacao, visivel, usuario_id, log_id)
VALUES
('Que foto incrível de Copacabana!', '2025-02-03', TRUE, 2, 1),
('Adoro a arquitetura da Casa Rosada!', '2025-03-07', TRUE, 3, 2),
('Times Square realmente parece impressionante.', '2025-04-03', TRUE, 4, 3),
('Vista maravilhosa de Santiago, parabéns pela trilha!', '2025-05-12', TRUE, 5, 4),
('Cancún é um sonho, quero muito conhecer!', '2025-06-03', TRUE, 6, 5),
('Toronto parece incrível para estudar, boa sorte!', '2025-07-06', TRUE, 7, 6),
('Cusco tem uma culinária fantástica, ótima escolha!', '2025-08-07', TRUE, 8, 7),
('Miami é perfeita para compras, adorei as fotos!', '2025-09-03', TRUE, 9, 8),
('Minas tem um charme único, ótimo registro!', '2025-10-12', TRUE, 10, 9),
('Algarve é paradisíaco, fotos maravilhosas!', '2025-11-03', TRUE, 1, 10);

INSERT INTO tbl_favorito (usuario_id, log_id)
VALUES
(1, 2),   -- João favoritou o log da Casa Rosada
(2, 1),   -- Maria favoritou o log de Copacabana
(3, 4),   -- Carlos favoritou o log do Cerro San Cristóbal
(4, 5),   -- Ana favoritou o log das praias de Cancún
(5, 3),   -- Pedro favoritou o log de Times Square
(6, 6),   -- Juliana favoritou o log da CN Tower
(7, 7),   -- Ricardo favoritou o log gastronômico em Cusco
(8, 9),   -- Fernanda favoritou o log rural em Minas
(9, 8),   -- Lucas favoritou o log de compras em Miami
(10, 10); -- Patrícia favoritou o log do Algarve

INSERT INTO tbl_curtida (usuario_id, log_id)
VALUES
(1, 1),   -- João curtiu o log de Copacabana
(2, 3),   -- Maria curtiu o log de Times Square
(3, 2),   -- Carlos curtiu o log da Casa Rosada
(4, 4),   -- Ana curtiu o log do Cerro San Cristóbal
(5, 5),   -- Pedro curtiu o log das praias de Cancún
(6, 6),   -- Juliana curtiu o log da CN Tower
(7, 7),   -- Ricardo curtiu o log gastronômico em Cusco
(8, 8),   -- Fernanda curtiu o log de compras em Miami
(9, 9),   -- Lucas curtiu o log rural em Minas
(10, 10); -- Patrícia curtiu o log do Algarve

INSERT INTO tbl_seguidor (data_inicio, usuario_id, seguidor_id)
VALUES
('2025-01-20', 1, 2),   -- Maria segue João
('2025-01-21', 2, 3),   -- Carlos segue Maria
('2025-01-22', 3, 4),   -- Ana segue Carlos
('2025-01-23', 4, 5),   -- Pedro segue Ana
('2025-01-24', 5, 6),   -- Juliana segue Pedro
('2025-01-25', 6, 7),   -- Ricardo segue Juliana
('2025-01-26', 7, 8),   -- Fernanda segue Ricardo
('2025-01-27', 8, 9),   -- Lucas segue Fernanda
('2025-01-28', 9, 10),  -- Patrícia segue Lucas
('2025-01-29', 10, 1);  -- João segue Patrícia