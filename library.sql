-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: library
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `Book`
--

DROP TABLE IF EXISTS `Book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Book` (
  `id_book` varchar(30) NOT NULL,
  `ISBN` varchar(13) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `year` int NOT NULL,
  `availablity` varchar(20) NOT NULL,
  `description` text,
  `imageUrl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_book`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Book`
--

LOCK TABLES `Book` WRITE;
/*!40000 ALTER TABLE `Book` DISABLE KEYS */;
INSERT INTO `Book` VALUES ('B001','9783161484100','The Great Gatsby','F. Scott Fitzgerald','Fiction',1925,'dostępna','A novel set in the Roaring Twenties.','https://example.com/gatsby.jpg'),('B002','9780140187396','1984','George Orwell','Dystopian',1949,'dostępna','A novel about a dystopian future.','https://example.com/1984.jpg'),('B003','9780743273565','To Kill a Mockingbird','Harper Lee','Fiction',1960,'dostępna','A novel about racial injustice in the Deep South.','https://example.com/mockingbird.jpg'),('B004','9780452284234','Brave New World','Aldous Huxley','Dystopian',1932,'dostępna','A novel about a dystopian future.','https://example.com/bravenewworld.jpg'),('B005','9780375708188','Catch-22','Joseph Heller','Fiction',1961,'dostępna','A novel about the absurdity of war.','https://example.com/catch22.jpg'),('B006','9780743273572','Slaughterhouse-Five','Kurt Vonnegut','Science Fiction',1969,'dostępna','A novel about the bombing of Dresden in World War II.','https://example.com/slaughterhousefive.jpg'),('B007','9780743273589','The Catcher in the Rye','J.D. Salinger','Fiction',1951,'dostępna','A novel about teenage angst and alienation.','https://example.com/catcherintherye.jpg'),('B008','9780743273596','The Hobbit','J.R.R. Tolkien','Fantasy',1937,'dostępna','A novel about the adventures of Bilbo Baggins.','https://example.com/hobbit.jpg'),('B009','9780743273602','Fahrenheit 451','Ray Bradbury','Dystopian',1953,'dostępna','A novel about a future where books are banned.','https://example.com/fahrenheit451.jpg'),('B010','9780743273619','Moby-Dick','Herman Melville','Adventure',1851,'dostępna','A novel about the voyage of the whaling ship Pequod.','https://example.com/mobydick.jpg');
/*!40000 ALTER TABLE `Book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Loan`
--

DROP TABLE IF EXISTS `Loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Loan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_book` varchar(30) NOT NULL,
  `id_user` int NOT NULL,
  `loan_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_book` (`id_book`),
  CONSTRAINT `loan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`),
  CONSTRAINT `loan_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `Book` (`id_book`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Loan`
--

LOCK TABLES `Loan` WRITE;
/*!40000 ALTER TABLE `Loan` DISABLE KEYS */;
/*!40000 ALTER TABLE `Loan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Logi`
--

DROP TABLE IF EXISTS `Logi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Logi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `login_date` date NOT NULL,
  `logout_date` date DEFAULT NULL,
  `operation` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `logi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Logi`
--

LOCK TABLES `Logi` WRITE;
/*!40000 ALTER TABLE `Logi` DISABLE KEYS */;
/*!40000 ALTER TABLE `Logi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservation`
--

DROP TABLE IF EXISTS `Reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_book` varchar(30) NOT NULL,
  `id_user` int NOT NULL,
  `reservation_date` date NOT NULL,
  `status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_book` (`id_book`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`id_book`) REFERENCES `Book` (`id_book`),
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservation`
--

LOCK TABLES `Reservation` WRITE;
/*!40000 ALTER TABLE `Reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `login` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `addres` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'johndoe','$2b$10$bONP1egNxKoALM/3WRDPAeUB.kGdYfsYptWxR9DSo31ntR6./QvNG','John','Doe','123 Main St','johndoe@example.com','reader'),(2,'janedoe','$2b$10$jrkprpkms9LhHVny4KEdROeHFrBZgb5/j9dy.tnj6wacPPuVBfFHa','Jane','Doe','456 Elm St','janedoe@example.com','reader'),(3,'mikejones','$2b$10$V6HrypzW86SDva5pd9hs6uAJf4CrgBcZ1B9hQgyGpDYw16qOBZeya','Mike','Jones','789 Oak St','mikejones@example.com','reader'),(4,'sarahconnor','$2b$10$JepzwXCNFBNpZACgX4lUIO9.bz0/mWLmxwmL7XuI7BfmBiEKT5GQu','Sarah','Connor','101 Pine St','sarahconnor@example.com','reader'),(5,'tomhardy','$2b$10$9iIa8/MW127ZQBGGglBFV.opl2OeDxKT5yiWGLItsE102KBpKbVXy','Tom','Hardy','202 Cedar St','tomhardy@example.com','reader'),(6,'emilyblunt','$2b$10$kPQ2XM9Mhfb1GLWALLqHUuh7B6leAX/skvlR16Zk7NlPpkkkyvTnC','Emily','Blunt','303 Birch St','emilyblunt@example.com','librarian'),(7,'bobjones','$2b$10$Sb8PGcONG6Wft0doWrwUNOHBoNhZ.MW8Olha69PRbm01tCBT1nNoO','Bob','Jones','404 Spruce St','bobjones@example.com','librarian'),(8,'alicesmith','$2b$10$JrMXVVY6iw/fVi4hw.Qhd.RGhTo/6gbF9v2CfMifYKvc2cqSngDE2','Alice','Smith','505 Maple St','alicesmith@example.com','librarian'),(9,'dianaprince','$2b$10$j5RhasYJiRErkoaYLn4ePeWXOIUT9JNboXsfA2XHa5.qznVYq.EKy','Diana','Prince','707 Ash St','dianaprince@example.com','admin');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-05 13:41:46
