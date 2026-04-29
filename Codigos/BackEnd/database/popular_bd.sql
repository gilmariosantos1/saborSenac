-- Script para popular o banco de dados sabor_senac com dados de teste
-- Execute este script após criar o schema para testar se há erros

USE sabor_senac;

-- Inserir categorias
INSERT INTO categoria (descricao) VALUES
('Bebidas'),
('Comidas'),
('Sobremesas');

-- Inserir pessoas (senhas hasheadas com SHA2-256)
INSERT INTO pessoas (nome, email, matricula, senha, perfil) VALUES
('João Silva', 'joao.aluno@senac.com', '20240001', SHA2('senha123', 256), 'ALUNO'),
('Maria Santos', 'maria.func@senac.com', 'FUNC001', SHA2('senha456', 256), 'FUNCIONARIO'),
('Admin User', 'admin@senac.com', 'ADMIN001', SHA2('adminpass', 256), 'ADMIN'),
('Pedro Oliveira', 'pedro.aluno@senac.com', '20240002', SHA2('senha789', 256), 'ALUNO');

-- Inserir produtos
INSERT INTO produtos (nome, preco, estoque, id_categoria) VALUES
('Refrigerante Cola', 5.50, 100, 1),
('X-Burguer', 12.00, 50, 2),
('Sorvete de Chocolate', 8.00, 30, 3),
('Suco Natural', 6.00, 80, 1),
('Pizza Margherita', 25.00, 20, 2),
('Torta de Maçã', 15.00, 15, 3);

-- Inserir reservas
INSERT INTO reservas (id_pessoa, data_reserva, status) VALUES
(1, '2024-04-29 10:00:00', 'ABERTA'),
(2, '2024-04-29 11:00:00', 'PAGA'),
(3, '2024-04-29 12:00:00', 'CANCELADA'),
(4, '2024-04-29 13:00:00', 'PAGA');

-- Inserir itens de reserva
INSERT INTO reserva_itens (id_reserva, id_produto, quantidade, preco_unitario) VALUES
(1, 1, 2, 5.50),
(1, 3, 1, 8.00),
(2, 2, 1, 12.00),
(2, 4, 1, 6.00),
(4, 5, 1, 25.00),
(4, 6, 1, 15.00);

-- Inserir vendas (apenas para reservas pagas)
INSERT INTO vendas (id_reserva, tipo_pagamento, valor_total) VALUES
(2, 'PIX', 18.00),
(4, 'CREDITO', 40.00);