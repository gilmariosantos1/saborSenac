-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: sabor_senac
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Bebidas'),(2,'Comidas'),(3,'Sobremesas');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `pessoas`
--

LOCK TABLES `pessoas` WRITE;
/*!40000 ALTER TABLE `pessoas` DISABLE KEYS */;
INSERT INTO `pessoas` VALUES (1,'João Silva','joao.aluno@senac.com','20240001','55a5e9e78207b4df8699d60886fa070079463547b095d1a05bc719bb4e6cd251','ALUNO'),(2,'Maria Santos','maria.func@senac.com','FUNC001','6b08d780140e292a4af8ba3f2333fc1357091442d7e807c6cad92e8dcd0240b7','FUNCIONARIO'),(3,'Admin User','admin@senac.com','ADMIN001','713bfda78870bf9d1b261f565286f85e97ee614efe5f0faf7c34e7ca4f65baca','ADMIN'),(4,'Pedro Oliveira','pedro.aluno@senac.com','20240002','b578dc5fcbfabbc7e96400601d0858c951f04929faef033bbbc117ab935c6ae9','ALUNO');
/*!40000 ALTER TABLE `pessoas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (7,'Coxinha de frango',6.00,20,2,'coxinha-de-frango.jpg'),(8,'Pastel de carne',7.00,3,2,'pastel-de-carne.jpg'),(9,'Empada de frango',6.00,12,2,'empada-de-frango.jpg'),(10,'Kibe',5.00,20,2,'kibe.jpg'),(11,'Enroladinho de salsicha',4.00,18,2,'enroladinho-de-salsicha.jpg'),(12,'Esfirra de carne',6.00,14,2,'esfirra-de-carne.jpg'),(13,'Pastel de queijo',6.00,10,2,'pastel-de-queijo.jpg'),(14,'Brigadeiro',3.00,25,3,'brigadeiro.jpg'),(15,'Beijinho',3.00,14,3,'beijinho.jpg'),(16,'Bolo de chocolate',8.00,10,3,'bolo-de-chocolate.jpg'),(17,'Pudim',7.00,12,3,'pudim.jpg'),(18,'Coca-Cola lata',5.00,24,1,'coca-cola-lata.jpg'),(19,'Suco de laranja',6.00,12,1,'suco-de-laranja.jpg'),(20,'Água mineral',3.00,50,1,'agua-mineral.jpg'),(21,'Refrigerante 2L',10.00,10,1,'refrigerante-2l.jpg');
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reserva_itens`
--

LOCK TABLES `reserva_itens` WRITE;
/*!40000 ALTER TABLE `reserva_itens` DISABLE KEYS */;
INSERT INTO `reserva_itens` VALUES (14,1,10,15,1,3.00);
/*!40000 ALTER TABLE `reserva_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (6,1,'2026-05-03 00:56:30','CANCELADA'),(7,1,'2026-05-03 01:03:28','PAGA'),(8,1,'2026-05-03 01:04:40','PAGA'),(9,1,'2026-05-03 01:08:08','PAGA'),(10,1,'2026-05-03 01:17:04','PAGA');
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-02 22:36:16
