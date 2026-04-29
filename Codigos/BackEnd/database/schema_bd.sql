-- MySQL dump 10.13  Distrib 8.4.8, for Linux (x86_64)
--
-- Host: localhost    Database: sabor_senac
-- ------------------------------------------------------
-- Server version	8.4.8-0ubuntu0.25.10.1

DROP TABLE IF EXISTS `categoria`;

CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Table structure for table `pessoas`
--

DROP TABLE IF EXISTS `pessoas`;

CREATE TABLE `pessoas` (
  `id_pessoa` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `matricula` varchar(20) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `perfil` enum('ALUNO','FUNCIONARIO','ADMIN') NOT NULL,
  PRIMARY KEY (`id_pessoa`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `matricula` (`matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;

CREATE TABLE `produtos` (
  `id_produto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `estoque` int NOT NULL,
  `id_categoria` int NOT NULL,
  PRIMARY KEY (`id_produto`),
  KEY `fk_produto_categoria` (`id_categoria`),
  CONSTRAINT `fk_produto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;

CREATE TABLE `reservas` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `id_pessoa` int NOT NULL,
  `data_reserva` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('ABERTA','PAGA','CANCELADA') NOT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `fk_reserva_pessoa` (`id_pessoa`),
  CONSTRAINT `fk_reserva_pessoa` FOREIGN KEY (`id_pessoa`) REFERENCES `pessoas` (`id_pessoa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `reserva_itens`
--

DROP TABLE IF EXISTS reserva_itens;

CREATE TABLE reserva_itens (
  id_item INT NOT NULL AUTO_INCREMENT,

  id_pessoa INT NOT NULL,
  id_reserva INT NULL,
  id_produto INT NOT NULL,

  quantidade INT NOT NULL,
  preco_unitario DECIMAL(10,2) NOT NULL,

  PRIMARY KEY (id_item),

  UNIQUE KEY uk_pessoa_produto (id_pessoa, id_produto),

  KEY fk_item_produto (id_produto),
  KEY fk_item_reserva (id_reserva),
  KEY fk_item_pessoa (id_pessoa),

  CONSTRAINT fk_item_pessoa
    FOREIGN KEY (id_pessoa)
    REFERENCES pessoas (id_pessoa),

  CONSTRAINT fk_item_reserva
    FOREIGN KEY (id_reserva)
    REFERENCES reservas (id_reserva),

  CONSTRAINT fk_item_produto
    FOREIGN KEY (id_produto)
    REFERENCES produtos (id_produto)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `vendas`
--

DROP TABLE IF EXISTS `vendas`;

CREATE TABLE `vendas` (
  `id_venda` int NOT NULL AUTO_INCREMENT,
  `id_reserva` int NOT NULL,
  `tipo_pagamento` enum('DINHEIRO','PIX','DEBITO','CREDITO') NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `data_venda` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_venda`),
  UNIQUE KEY `id_reserva` (`id_reserva`),
  CONSTRAINT `fk_venda_reserva` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id_reserva`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Dump completed on 2026-04-29 18:57:45
