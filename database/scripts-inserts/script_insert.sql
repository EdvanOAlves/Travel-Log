INSERT INTO tbl_usuario (
    nome,
    apelido,
    email,
    telefone,
    senha,
    data_cadastro,
    foto_perfil,
    descricao,
    ativo
) VALUES
('Maria Oliveira', 'maryo', 'maria.oliveira@example.com', '(11) 99876-5432',
 '$2a$10$abc123abc123abc123abc123abc123abc123abc123abc123abc123', CURDATE(),
 'maria_perfil.jpg', 'Apaixonada por viagens culturais', TRUE),

('Carlos Pereira', 'carlosp', 'carlos.pereira@example.com', '(21) 98765-4321',
 '$2a$10$def456def456def456def456def456def456def456def456def456', CURDATE(),
 'carlos_perfil.png', 'Explorador de trilhas e aventuras', TRUE),

('Ana Souza', 'anas', 'ana.souza@example.com', '(31) 91234-5678',
 '$2a$10$ghi789ghi789ghi789ghi789ghi789ghi789ghi789ghi789ghi789', CURDATE(),
 NULL, 'Gosta de gastronomia e turismo local', TRUE),

('Pedro Santos', 'pedros', 'pedro.santos@example.com', '(41) 97654-3210',
 '$2a$10$jkl012jkl012jkl012jkl012jkl012jkl012jkl012jkl012jkl012', CURDATE(),
 'pedro_perfil.jpg', 'Viaja muito a trabalho', TRUE),

('Fernanda Lima', 'ferl', 'fernanda.lima@example.com', '(51) 93456-7890',
 '$2a$10$mno345mno345mno345mno345mno345mno345mno345mno345mno345', CURDATE(),
 'fernanda_perfil.jpg', 'Ama destinos românticos e praias', TRUE);

SELECT * FROM tbl_usuario;

INSERT INTO tbl_pais (nome) VALUES
('Brasil'),
('Argentina'),
('Chile'),
('Estados Unidos'),
('Canadá'),
('Japão'),
('Alemanha'),
('França'),
('Itália'),
('Portugal');

SELECT * FROM tbl_pais;

INSERT INTO tbl_local (
    nome,
    estado,
    cidade,
    pais_id
) VALUES
('Praia de Copacabana', 'Rio de Janeiro', 'Rio de Janeiro', 1), -- Brasil
('Obelisco', 'Buenos Aires', 'Buenos Aires', 2),                -- Argentina
('Estátua da Liberdade', 'Nova York', 'Nova York', 4),          -- Estados Unidos
('Torre Eiffel', NULL, 'Paris', 8),                             -- França
('Coliseu', 'Lácio', 'Roma', 9),                                -- Itália
('Castelo de São Jorge', NULL, 'Lisboa', 10);                   -- Portugal

SELECT * FROM tbl_local;

INSERT INTO tbl_tipo_viagem (nome) VALUES
('Turismo'),
('Negócios'),
('Intercâmbio'),
('Aventura'),
('Romântica'),
('Cultural'),
('Religiosa'),
('Cruzeiro'),
('Ecológica'),
('Gastronômica');

SELECT * FROM tbl_tipo_viagem;

INSERT INTO tbl_viagem (
    titulo,
    data_inicio,
    data_fim,
    thumbnail,
    usuario_id,
    tipo_viagem_id,
    visivel
) VALUES
('Viagem ao Rio de Janeiro', '2025-01-10', '2025-01-20', 'rio_thumbnail.jpg', 1, 1, TRUE), -- Turismo
('Conferência em São Paulo', '2025-03-05', '2025-03-07', 'sp_conferencia.jpg', 1, 2, TRUE), -- Negócios
('Trilha na Patagônia', '2025-04-15', '2025-04-25', 'patagonia.jpg', 1, 4, TRUE), -- Aventura
('Lua de Mel em Paris', '2025-06-01', '2025-06-10', 'paris.jpg', 1, 5, TRUE); -- Romântica

SELECT * FROM tbl_viagem;

INSERT INTO tbl_log (
    descricao,
    data_publicacao,
    contagem_curtidas,
    contagem_favoritos,
    visivel,
    viagem_id,
    local_id
) VALUES
('Cheguei ao destino hoje, primeira impressão excelente! O clima ajudou bastante.', '2025-01-12', 0, 0, 1, 1, 3),
('Visitei um parque local pela manhã, paisagens incríveis e muita tranquilidade.', '2025-01-14', 0, 0, 1, 2, 5),
('Dia de explorar o centro histórico, bastante cultura e boa comida.', '2025-02-01', 0, 0, 1, 3, 2),
('Fiz uma trilha leve durante a tarde, deu pra ver toda a cidade do alto.', '2025-02-10', 0, 0, 1, 4, 7),
('Último dia da viagem, aproveitei para revisitar meus lugares favoritos.', '2025-02-15', 0, 0, 1, 5, 4);
