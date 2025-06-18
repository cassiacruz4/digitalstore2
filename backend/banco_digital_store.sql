-- Criar banco de dados
CREATE DATABASE digital_store;

USE digital_store;

-- Criar tabela de usuários
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    celular VARCHAR(15) NOT NULL,
    endereco VARCHAR(500) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    complemento VARCHAR(255) DEFAULT NULL,
    newsletter BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Índices para otimização
    INDEX idx_cpf (cpf),
    INDEX idx_email (email),
    INDEX idx_data_cadastro (data_cadastro),
    INDEX idx_ativo (ativo)
);

-- Inserir alguns dados de exemplo (opcional)
INSERT INTO usuarios (
    nome_completo, cpf, email, celular, endereco, bairro, 
    cidade, cep, complemento, newsletter
) VALUES 
(
    'João Silva Santos', 
    '12345678901', 
    'joao@email.com', 
    '85987654321', 
    'Rua das Flores, 123', 
    'Centro', 
    'Fortaleza', 
    '60000000', 
    'Apto 101', 
    TRUE
),
(
    'Maria Oliveira Costa', 
    '98765432109', 
    'maria@email.com', 
    '85912345678', 
    'Av. Beira Mar, 456', 
    'Meireles', 
    'Fortaleza', 
    '60165000', 
    NULL, 
    FALSE
);

-- Views úteis para consultas

-- View para usuários ativos com dados formatados
CREATE VIEW v_usuarios_ativos AS
SELECT 
    id,
    nome_completo,
    CONCAT(
        SUBSTRING(cpf, 1, 3), '.', 
        SUBSTRING(cpf, 4, 3), '.', 
        SUBSTRING(cpf, 7, 3), '-', 
        SUBSTRING(cpf, 10, 2)
    ) AS cpf_formatado,
    email,
    CASE 
        WHEN LENGTH(celular) = 11 THEN 
            CONCAT('(', SUBSTRING(celular, 1, 2), ') ', 
                   SUBSTRING(celular, 3, 5), '-', 
                   SUBSTRING(celular, 8, 4))
        ELSE 
            CONCAT('(', SUBSTRING(celular, 1, 2), ') ', 
                   SUBSTRING(celular, 3, 4), '-', 
                   SUBSTRING(celular, 7, 4))
    END AS celular_formatado,
    CONCAT(endereco, 
           CASE WHEN complemento IS NOT NULL THEN CONCAT(', ', complemento) ELSE '' END,
           ', ', bairro, ', ', cidade, ' - CEP: ',
           CONCAT(SUBSTRING(cep, 1, 5), '-', SUBSTRING(cep, 6, 3))
    ) AS endereco_completo,
    newsletter,
    DATE_FORMAT(data_cadastro, '%d/%m/%Y às %H:%i') AS data_cadastro_formatada
FROM usuarios 
WHERE ativo = TRUE;

-- View para estatísticas
CREATE VIEW v_estatisticas_usuarios AS
SELECT 
    COUNT(*) as total_usuarios,
    COUNT(CASE WHEN ativo = TRUE THEN 1 END) as usuarios_ativos,
    COUNT(CASE WHEN newsletter = TRUE THEN 1 END) as inscritos_newsletter,
    COUNT(CASE WHEN DATE(data_cadastro) = CURDATE() THEN 1 END) as cadastros_hoje,
    COUNT(CASE WHEN YEAR(data_cadastro) = YEAR(CURDATE()) 
               AND MONTH(data_cadastro) = MONTH(CURDATE()) THEN 1 END) as cadastros_mes_atual
FROM usuarios;

CREATE DATABASE produtocadastro;

select * from usuarios


