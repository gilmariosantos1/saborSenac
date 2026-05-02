-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sabor_senac
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sabor_senac
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sabor_senac` DEFAULT CHARACTER SET utf8 ;
USE `sabor_senac` ;

-- -----------------------------------------------------
-- Table `sabor_senac`.`pessoas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sabor_senac`.`pessoas` (
  `id_pessoas` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `matricula` VARCHAR(10) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `perfil` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id_pessoas`),
  UNIQUE INDEX `matricula_UNIQUE` (`matricula` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sabor_senac`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sabor_senac`.`categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sabor_senac`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sabor_senac`.`produtos` (
  `id_produtos` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `preco` REAL NOT NULL,
  `quantidade` INT(5) NOT NULL,
  `categoria_id_categoria` INT NOT NULL,
  PRIMARY KEY (`id_produtos`, `categoria_id_categoria`),
  INDEX `fk_produtos_categoria1_idx` (`categoria_id_categoria` ASC) VISIBLE,
  CONSTRAINT `fk_produtos_categoria1`
    FOREIGN KEY (`categoria_id_categoria`)
    REFERENCES `sabor_senac`.`categoria` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sabor_senac`.`reservas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sabor_senac`.`reservas` (
  `id_reserva` INT NOT NULL AUTO_INCREMENT,
  `pedido` INT(10) NOT NULL,
  `data_reserva` DATETIME NOT NULL,
  `tipo_pagamento` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `pessoas_id_pessoas` INT NOT NULL,
  `produtos_id_produtos` INT NOT NULL,
  PRIMARY KEY (`id_reserva`, `pessoas_id_pessoas`, `produtos_id_produtos`),
  INDEX `fk_reservas_usuarios1_idx` (`pessoas_id_pessoas` ASC) VISIBLE,
  INDEX `fk_reservas_produtos1_idx` (`produtos_id_produtos` ASC) VISIBLE,
  CONSTRAINT `fk_reservas_usuarios1`
    FOREIGN KEY (`pessoas_id_pessoas`)
    REFERENCES `sabor_senac`.`pessoas` (`id_pessoas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_produtos1`
    FOREIGN KEY (`produtos_id_produtos`)
    REFERENCES `sabor_senac`.`produtos` (`id_produtos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sabor_senac`.`duvidas_sugestoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sabor_senac`.`duvidas_sugestoes` (
  `id_duvidas_sugestoes` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `contato` VARCHAR(45) NOT NULL,
  `mensagem` TEXT(300) NOT NULL,
  `protocolo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_duvidas_sugestoes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sabor_senac`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sabor_senac`.`login` (
  `id_login` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `perfil` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id_login`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sabor_senac`.`vendas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sabor_senac`.`vendas` (
  `id_vendas` INT NOT NULL AUTO_INCREMENT,
  `pedido` INT(3) NOT NULL,
  `preco` REAL NOT NULL,
  `quantidade_saida` VARCHAR(45) NOT NULL,
  `reservas_id_reserva` INT NOT NULL,
  `reservas_pessoas_id_pessoas` INT NOT NULL,
  `reservas_produtos_id_produtos` INT NOT NULL,
  PRIMARY KEY (`id_vendas`, `reservas_id_reserva`, `reservas_pessoas_id_pessoas`, `reservas_produtos_id_produtos`),
  INDEX `fk_pedidos_diarios_reservas1_idx` (`reservas_id_reserva` ASC, `reservas_pessoas_id_pessoas` ASC, `reservas_produtos_id_produtos` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_diarios_reservas1`
    FOREIGN KEY (`reservas_id_reserva` , `reservas_pessoas_id_pessoas` , `reservas_produtos_id_produtos`)
    REFERENCES `sabor_senac`.`reservas` (`id_reserva` , `pessoas_id_pessoas` , `produtos_id_produtos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sabor_senac`.`vendas_has_produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sabor_senac`.`vendas_has_produtos` (
  `vendas_id_vendas` INT NOT NULL,
  `vendas_reservas_id_reserva` INT NOT NULL,
  `vendas_reservas_pessoas_id_pessoas` INT NOT NULL,
  `vendas_reservas_produtos_id_produtos` INT NOT NULL,
  `produtos_id_produtos` INT NOT NULL,
  `produtos_categoria_id_categoria` INT NOT NULL,
  PRIMARY KEY (`vendas_id_vendas`, `vendas_reservas_id_reserva`, `vendas_reservas_pessoas_id_pessoas`, `vendas_reservas_produtos_id_produtos`, `produtos_id_produtos`, `produtos_categoria_id_categoria`),
  INDEX `fk_vendas_has_produtos_produtos1_idx` (`produtos_id_produtos` ASC, `produtos_categoria_id_categoria` ASC) VISIBLE,
  INDEX `fk_vendas_has_produtos_vendas1_idx` (`vendas_id_vendas` ASC, `vendas_reservas_id_reserva` ASC, `vendas_reservas_pessoas_id_pessoas` ASC, `vendas_reservas_produtos_id_produtos` ASC) VISIBLE,
  CONSTRAINT `fk_vendas_has_produtos_vendas1`
    FOREIGN KEY (`vendas_id_vendas` , `vendas_reservas_id_reserva` , `vendas_reservas_pessoas_id_pessoas` , `vendas_reservas_produtos_id_produtos`)
    REFERENCES `sabor_senac`.`vendas` (`id_vendas` , `reservas_id_reserva` , `reservas_pessoas_id_pessoas` , `reservas_produtos_id_produtos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_vendas_has_produtos_produtos1`
    FOREIGN KEY (`produtos_id_produtos` , `produtos_categoria_id_categoria`)
    REFERENCES `sabor_senac`.`produtos` (`id_produtos` , `categoria_id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
