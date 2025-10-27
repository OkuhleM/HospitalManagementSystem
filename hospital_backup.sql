-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: HospitalManagementSystem
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.24.04.2

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
-- Table structure for table `Doctors`
--

DROP TABLE IF EXISTS `Doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Doctors` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `specialty` varchar(100) NOT NULL,
  `license_number` varchar(50) NOT NULL,
  `created_at` date DEFAULT NULL,
  `notes` text NOT NULL,
  `ward_id` int DEFAULT NULL,
  PRIMARY KEY (`doctor_id`),
  UNIQUE KEY `license_number` (`license_number`),
  KEY `user_id` (`user_id`),
  KEY `fk_doctor_ward` (`ward_id`),
  CONSTRAINT `Doctors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_doctor_ward` FOREIGN KEY (`ward_id`) REFERENCES `wards` (`ward_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Doctors`
--

LOCK TABLES `Doctors` WRITE;
/*!40000 ALTER TABLE `Doctors` DISABLE KEYS */;
INSERT INTO `Doctors` VALUES (1,2,'Cardiology','DOC-123456','2025-08-14','',NULL),(2,13,'Surgeon','DOC-0180000261920 MP 0533025','2025-08-30','patient needs surgery',NULL),(3,14,'Pediatrician','DOC-0180000271928 MP 0533025','2025-08-30','Needs C Section',NULL);
/*!40000 ALTER TABLE `Doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MedicalAid`
--

DROP TABLE IF EXISTS `MedicalAid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MedicalAid` (
  `medical_aid_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `plan` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`medical_aid_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MedicalAid`
--

LOCK TABLES `MedicalAid` WRITE;
/*!40000 ALTER TABLE `MedicalAid` DISABLE KEYS */;
INSERT INTO `MedicalAid` VALUES (1,'BestMed','Comprehensive','2025-09-09 00:04:19','2025-09-09 00:04:19'),(2,'FedHealth','Unlimited','2025-09-09 00:05:01','2025-09-09 00:05:01'),(3,'Discovery Medical Aid','Unlimited','2025-09-09 00:05:18','2025-09-09 00:05:18'),(4,'KeyHealth','Essence','2025-09-09 00:05:54','2025-09-09 00:05:54'),(5,'MediHelp','Comprehensive','2025-09-09 00:06:27','2025-09-09 00:06:27');
/*!40000 ALTER TABLE `MedicalAid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Nurses`
--

DROP TABLE IF EXISTS `Nurses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Nurses` (
  `nurse_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`nurse_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Nurses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Nurses`
--

LOCK TABLES `Nurses` WRITE;
/*!40000 ALTER TABLE `Nurses` DISABLE KEYS */;
INSERT INTO `Nurses` VALUES (1,4);
/*!40000 ALTER TABLE `Nurses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','doctor','nurse','receptionist','matron') NOT NULL,
  `isFirstLogin` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Nicole','Schezinger','nicole@gmail.com','0601234567','$2b$10$DsEFrL5HTqBO4XqMpiwr1eGtCPqvVaPio.Mv.KupYhnEXvIuRsVSK','admin',1,'2025-08-14 21:26:08'),(2,'Zayn','Malik','zmalik@hospital.com','0812345678','$2b$10$r2ofAjp7U8CAfUW0UfhBpOaRItx6EJNJUHadNmefqglum41op8cMm','doctor',1,'2025-08-14 21:43:02'),(4,'Perrie','Edwards','perryedwards@hospital.com','0212345678','$2b$10$dvdHYxO5PU8ahLn3QdUq8eNk2gHx.WqUyoZue60FZW0Qtv/ZPHjiy','nurse',1,'2025-08-20 21:10:14'),(9,'Julliet','Sibisi','sibisi.j@hospital.com','0824327865','$2b$10$FRCPiYmpk7HX2HBaqe.Ghe3j/5CmGCfyKaTf5A/qcpMzAgwvxFQEu','receptionist',1,'2025-08-20 21:21:21'),(10,'Simon','Cowell','simoncowell@gmail.com','0781234567','$2b$10$SWGuIX/3f0/BtWDWn.MZ6OLOHtElnr6ESyOAAkp0yOuOyBRTuzjdi','matron',1,'2025-08-27 21:01:36'),(13,'Christopher','Brown','chrisbrown@hospital.com','0602345678','$2b$10$j4Xe/.fCFNkYZMOvrHMS..YIdm28RF0rIJhRp725zDLjMT9WqA6kK','doctor',1,'2025-08-30 20:29:13'),(14,'Minenhle','Sobisi','Minenhle@hospital.com','0782345678','$2b$10$KooejxecNJTPwr56MpA1EeABGG02jiZe82nxOe.dRxPEPVyij6ehm','doctor',1,'2025-08-30 20:32:19');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int DEFAULT NULL,
  `scheduled_by` int NOT NULL,
  `notes` text NOT NULL,
  `diagnosis` text NOT NULL,
  `treatment` text NOT NULL,
  `prescription` text NOT NULL,
  `ward_id` int DEFAULT NULL,
  `appointment_datetime` datetime NOT NULL,
  `status` enum('scheduled','checked_in','in_consultation','completed','cancelled','no_show') DEFAULT 'scheduled',
  PRIMARY KEY (`appointment_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `ward_id` (`ward_id`),
  KEY `fk_appointments` (`scheduled_by`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`),
  CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`doctor_id`) REFERENCES `Doctors` (`doctor_id`),
  CONSTRAINT `appointments_ibfk_4` FOREIGN KEY (`ward_id`) REFERENCES `wards` (`ward_id`),
  CONSTRAINT `fk_appointments` FOREIGN KEY (`scheduled_by`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (4,1,2,13,'Routine blood pressure check','Hypertension','Lifestyle adjustments','Medication A',2,'2025-09-02 07:30:00','scheduled'),(5,1,2,13,'Routine blood pressure check','Hypertension','Lifestyle adjustments','Medication A',2,'2025-09-02 07:30:00','scheduled'),(6,1,2,13,'Routine blood pressure check','Hypertension','Lifestyle adjustments','Medication A',2,'2025-09-02 07:30:00','scheduled'),(7,1,2,13,'Routine blood pressure check','Hypertension','Lifestyle adjustments','Medication A',2,'2025-09-02 07:30:00','scheduled'),(8,1,1,13,'Pregnancy check up','third trimester','eat healthy','Vitamins and Iron Deficiency Pills',3,'2025-09-02 07:30:00','scheduled');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `action` varchar(100) NOT NULL,
  `user_id` int DEFAULT NULL,
  `target_table` varchar(100) DEFAULT NULL,
  `target_id` int DEFAULT NULL,
  `new_value` text,
  `old_value` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,'ASSIGN_NURSE',NULL,'nurse_assignments',3,'{\"created_at\":\"2025-08-27T22:37:23.481Z\",\"assignment_id\":3,\"nurse_id\":1,\"assigned_by_user_id\":10,\"assigned_to_type\":\"pharmacy\",\"assigned_doctor_id\":null,\"email\":\"perryedwards@hospital.com\",\"doctor_email\":\"\",\"shift_date\":\"2025-09-01T00:00:00.000Z\",\"shift_start\":\"2025-08-27T06:30:00.000Z\",\"shift_end\":\"2025-08-27T14:00:00.000Z\",\"notes\":\"Night shift testing\"}',NULL,'2025-08-27 22:37:23'),(2,'CREATE_APPOINTMENT',13,NULL,NULL,NULL,NULL,'2025-09-02 22:00:23'),(3,'CREATE_APPOINTMENT',13,NULL,NULL,NULL,NULL,'2025-09-02 22:01:14'),(4,'CREATE_APPOINTMENT',13,NULL,NULL,NULL,NULL,'2025-09-02 22:06:07'),(5,'CREATE_APPOINTMENT',13,NULL,NULL,NULL,NULL,'2025-09-02 22:09:40');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing`
--

DROP TABLE IF EXISTS `billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing` (
  `bill_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `amount` int NOT NULL,
  `billing_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `medical_aid_id` int DEFAULT NULL,
  `paid_by_medical_aid` tinyint(1) DEFAULT '0',
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`bill_id`),
  KEY `patient_id` (`patient_id`),
  KEY `fk_medical_aid_key` (`medical_aid_id`),
  CONSTRAINT `billing_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`),
  CONSTRAINT `fk_medical_aid_key` FOREIGN KEY (`medical_aid_id`) REFERENCES `MedicalAid` (`medical_aid_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing`
--

LOCK TABLES `billing` WRITE;
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;
INSERT INTO `billing` VALUES (1,1,570,'2025-10-21 12:40:32',2,1,1);
/*!40000 ALTER TABLE `billing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `claims`
--

DROP TABLE IF EXISTS `claims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `claims` (
  `claim_id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int NOT NULL,
  `insurance_id` int NOT NULL,
  `claim_amount` decimal(10,2) NOT NULL,
  `status` enum('submitted','approved','rejected','pending') DEFAULT 'pending',
  `submitted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `processed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`claim_id`),
  KEY `invoice_id` (`invoice_id`),
  KEY `fk_claim_insurance` (`insurance_id`),
  CONSTRAINT `claims_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`invoice_id`),
  CONSTRAINT `fk_claim_insurance` FOREIGN KEY (`insurance_id`) REFERENCES `MedicalAid` (`medical_aid_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claims`
--

LOCK TABLES `claims` WRITE;
/*!40000 ALTER TABLE `claims` DISABLE KEYS */;
INSERT INTO `claims` VALUES (1,1,1,2500.00,'approved','2025-10-25 10:32:45',NULL),(2,1,1,2500.00,'approved','2025-10-25 10:32:45','2025-10-27 11:32:45');
/*!40000 ALTER TABLE `claims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('unpaid','paid','pending') DEFAULT 'unpaid',
  `payment_method` enum('cash','card','medical_aid') DEFAULT 'cash',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`invoice_id`),
  KEY `fk_invoice_patient` (`patient_id`),
  KEY `fk_invoice_doctor` (`doctor_id`),
  CONSTRAINT `fk_invoice_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `Doctors` (`doctor_id`),
  CONSTRAINT `fk_invoice_patient` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,1,2,130.98,'unpaid','card','2025-09-10 14:16:09','2025-09-10 18:18:29');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_records`
--

DROP TABLE IF EXISTS `medical_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_records` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `visit_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `record_type` enum('consult_note','nursing_note','prescription','lab_result','radiology','discharge_summary','other') DEFAULT 'consult_note',
  `note` text NOT NULL,
  `attached_files` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`record_id`),
  KEY `patient_id` (`patient_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `medical_records_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE,
  CONSTRAINT `medical_records_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_records`
--

LOCK TABLES `medical_records` WRITE;
/*!40000 ALTER TABLE `medical_records` DISABLE KEYS */;
INSERT INTO `medical_records` VALUES (1,1,9,'2025-10-22 10:30:36','radiology','run CT scan and check for more fractures','{}','2025-09-08 21:18:10',NULL);
/*!40000 ALTER TABLE `medical_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication`
--

DROP TABLE IF EXISTS `medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medication` (
  `medication_id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `quantity` int NOT NULL,
  `expiry_date` date NOT NULL,
  PRIMARY KEY (`medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication`
--

LOCK TABLES `medication` WRITE;
/*!40000 ALTER TABLE `medication` DISABLE KEYS */;
INSERT INTO `medication` VALUES (1,'Duloxetine',100,'2027-12-24'),(2,'Co-beneldopa',200,'2027-10-24'),(3,'Ibuprofen and codeine',200,'2028-10-24'),(4,'Insulin',200,'2028-10-24'),(5,'Fentanyl',200,'2028-10-24'),(6,'Vaginal oestrogen',100,'2030-10-25');
/*!40000 ALTER TABLE `medication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurse_assignments`
--

DROP TABLE IF EXISTS `nurse_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurse_assignments` (
  `assignment_id` int NOT NULL AUTO_INCREMENT,
  `nurse_id` int NOT NULL,
  `assigned_by_user_id` int DEFAULT NULL,
  `assigned_to_type` enum('doctor','pharmacy') NOT NULL,
  `assigned_doctor_id` int DEFAULT NULL,
  `assigned_ward_id` int DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `doctor_email` varchar(255) NOT NULL,
  `shift_date` date DEFAULT NULL,
  `shift_start` datetime DEFAULT NULL,
  `shift_end` datetime DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`assignment_id`),
  KEY `nurse_id` (`nurse_id`),
  KEY `assigned_doctor_id` (`assigned_doctor_id`),
  KEY `assigned_ward_id` (`assigned_ward_id`),
  KEY `assigned_by_user_id` (`assigned_by_user_id`),
  CONSTRAINT `nurse_assignments_ibfk_1` FOREIGN KEY (`nurse_id`) REFERENCES `Nurses` (`nurse_id`) ON DELETE CASCADE,
  CONSTRAINT `nurse_assignments_ibfk_2` FOREIGN KEY (`assigned_doctor_id`) REFERENCES `Doctors` (`doctor_id`) ON DELETE SET NULL,
  CONSTRAINT `nurse_assignments_ibfk_3` FOREIGN KEY (`assigned_ward_id`) REFERENCES `wards` (`ward_id`) ON DELETE SET NULL,
  CONSTRAINT `nurse_assignments_ibfk_4` FOREIGN KEY (`assigned_by_user_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse_assignments`
--

LOCK TABLES `nurse_assignments` WRITE;
/*!40000 ALTER TABLE `nurse_assignments` DISABLE KEYS */;
INSERT INTO `nurse_assignments` VALUES (1,1,NULL,'doctor',NULL,NULL,'perryedwards@hospital.com','zmalik@hospital.com','2025-09-01','2025-08-27 06:30:00','2025-08-27 14:00:00','Day shift with Dr. Malik','2025-08-27 21:39:51'),(2,1,10,'doctor',1,NULL,'perryedwards@hospital.com','zmalik@hospital.com','2025-09-01','2025-08-27 06:30:00','2025-08-27 14:00:00','Day shift with Dr. Malik','2025-08-27 21:49:59'),(3,1,10,'pharmacy',NULL,NULL,'perryedwards@hospital.com','','2025-09-01','2025-08-27 06:30:00','2025-08-27 14:00:00','Night shift testing','2025-08-27 22:37:23');
/*!40000 ALTER TABLE `nurse_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `date_of_birth` date NOT NULL,
  `id_Number` varchar(13) NOT NULL,
  `medical_condition` text NOT NULL,
  `medical_history` text NOT NULL,
  `contacts` varchar(20) NOT NULL,
  `gender` enum('male','female','other') NOT NULL DEFAULT 'other',
  `address` text NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `medical_aid_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`patient_id`),
  KEY `fk_medical_aid` (`medical_aid_id`),
  CONSTRAINT `fk_medical_aid` FOREIGN KEY (`medical_aid_id`) REFERENCES `MedicalAid` (`medical_aid_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (1,'1997-06-25','9706254529083','Hypertension','No prior surgeries','081 435 6784','male','456 Pine Street, Gauteng, Johannesburg','Siyanda Bongani','Dlamini',NULL,'2025-08-21 20:02:42','2025-08-21 20:02:42');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('cash','card','medical_aid','eft') DEFAULT 'cash',
  `payment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `fk_payment_invoice` (`invoice_id`),
  CONSTRAINT `fk_payment_invoice` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`invoice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,234.00,'card','2025-09-10 17:07:25'),(2,1,234.00,'card','2025-09-10 17:08:09'),(3,1,234.00,'card','2025-09-10 17:39:51'),(4,1,234.00,'card','2025-09-10 18:12:30'),(5,1,234.00,'card','2025-09-10 18:18:28'),(6,1,543.00,'card','2025-09-10 18:24:40');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharmacy`
--

DROP TABLE IF EXISTS `pharmacy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacy` (
  `pharmacy_id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `location` text NOT NULL,
  `contact` varchar(15) NOT NULL,
  PRIMARY KEY (`pharmacy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacy`
--

LOCK TABLES `pharmacy` WRITE;
/*!40000 ALTER TABLE `pharmacy` DISABLE KEYS */;
INSERT INTO `pharmacy` VALUES (1,'CareEssentials','Riverside Square','011 023 4679'),(2,'MediCove','Fourways Mall','011 245 9786'),(3,'PharmaSense','The Blyde','011 978 2341'),(4,'Clicks Pharmacy','Mall Of Africa','011 100 1516'),(5,'Dischem','Clear Water','011 831 2140');
/*!40000 ALTER TABLE `pharmacy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescriptions`
--

DROP TABLE IF EXISTS `prescriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescriptions` (
  `prescription_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `medication_id` int NOT NULL,
  `dosage` text NOT NULL,
  `frequency` text NOT NULL,
  `duration` text NOT NULL,
  PRIMARY KEY (`prescription_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `medication_id` (`medication_id`),
  CONSTRAINT `prescriptions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`),
  CONSTRAINT `prescriptions_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `Doctors` (`doctor_id`),
  CONSTRAINT `prescriptions_ibfk_3` FOREIGN KEY (`medication_id`) REFERENCES `medication` (`medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescriptions`
--

LOCK TABLES `prescriptions` WRITE;
/*!40000 ALTER TABLE `prescriptions` DISABLE KEYS */;
INSERT INTO `prescriptions` VALUES (1,1,2,5,'one tablet every six hours ','for a week','forever');
/*!40000 ALTER TABLE `prescriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receptionists`
--

DROP TABLE IF EXISTS `receptionists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receptionists` (
  `receptionist_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `start_date` date NOT NULL,
  PRIMARY KEY (`receptionist_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `receptionists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receptionists`
--

LOCK TABLES `receptionists` WRITE;
/*!40000 ALTER TABLE `receptionists` DISABLE KEYS */;
INSERT INTO `receptionists` VALUES (1,9,'2025-08-20');
/*!40000 ALTER TABLE `receptionists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receptionists_history`
--

DROP TABLE IF EXISTS `receptionists_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receptionists_history` (
  `record_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `started_date` date NOT NULL,
  `ended_date` date NOT NULL,
  PRIMARY KEY (`record_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `receptionists_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receptionists_history`
--

LOCK TABLES `receptionists_history` WRITE;
/*!40000 ALTER TABLE `receptionists_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `receptionists_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `ward_id` int NOT NULL,
  `room_number` int NOT NULL,
  `bed_count` int NOT NULL,
  `occupied_beds` int NOT NULL,
  PRIMARY KEY (`room_id`),
  KEY `ward_id` (`ward_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`ward_id`) REFERENCES `wards` (`ward_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,4,57,25,20),(2,5,57,25,20),(3,3,106,20,15);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wards`
--

DROP TABLE IF EXISTS `wards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wards` (
  `ward_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `capacity` int NOT NULL,
  `type` enum('ward','pharmacy','icu','opd','other') DEFAULT 'ward',
  PRIMARY KEY (`ward_id`),
  UNIQUE KEY `unique_ward_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wards`
--

LOCK TABLES `wards` WRITE;
/*!40000 ALTER TABLE `wards` DISABLE KEYS */;
INSERT INTO `wards` VALUES (2,'Surgical',25,'other'),(3,'Maternity',30,'other'),(4,'Cardiology',15,'other'),(5,'Pediatric',15,'other');
/*!40000 ALTER TABLE `wards` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-27 22:50:25
