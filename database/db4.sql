-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: db4
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `hackathon`
--

DROP TABLE IF EXISTS `hackathon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hackathon` (
  `id` int NOT NULL,
  `offering_type` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `category` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `platform` varchar(50) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `availability_schedule` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hackathon`
--

LOCK TABLES `hackathon` WRITE;
/*!40000 ALTER TABLE `hackathon` DISABLE KEYS */;
INSERT INTO `hackathon` VALUES (1,'Hackathon','AI Challenge 2024','A hackathon focusing on innovative AI solutions.','Technology','New York, USA','In-person','http://hackathon1.com',4.8,'2024-12-20 09:00:00'),(2,'Hackathon','Blockchain for Good','Develop blockchain solutions for social impact.','Finance','San Francisco, USA','Hybrid','http://hackathon2.com',4.7,'2024-12-22 10:00:00'),(3,'Hackathon','Sustainability Hackathon','Tackle climate change with tech-based solutions.','Environment','Berlin, Germany','Online','http://hackathon3.com',4.6,'2024-12-25 15:00:00'),(4,'Hackathon','Smart City Solutions','Innovate for smarter urban living.','Technology','Tokyo, Japan','In-person','http://hackathon4.com',4.9,'2024-12-30 14:00:00'),(5,'Hackathon','Healthcare Innovation','Create solutions for modern healthcare challenges.','Health','London, UK','Online','http://hackathon5.com',4.5,'2024-12-18 13:00:00'),(6,'Hackathon','Fintech Hackathon','Build the next generation of fintech applications.','Finance','Singapore','Hybrid','http://hackathon6.com',4.6,'2024-12-21 09:00:00'),(7,'Hackathon','EdTech Solutions','Focus on educational tools for the future.','Education','Online','Online','http://hackathon7.com',4.4,'2024-12-26 12:00:00'),(8,'Hackathon','Gaming for Change','Develop impactful games that inspire social change.','Art','Paris, France','In-person','http://hackathon8.com',4.7,'2024-12-23 11:00:00'),(9,'Hackathon','IoT and Automation','Explore IoT applications and automation technologies.','Technology','Toronto, Canada','Online','http://hackathon9.com',4.5,'2024-12-29 10:00:00'),(10,'Hackathon','Climate Solutions Hackathon','Innovate for climate resilience and adaptation.','Environment','Sydney, Australia','Hybrid','http://hackathon10.com',4.8,'2024-12-28 14:00:00'),(11,'Hackathon','Social Innovation Jam','Develop solutions for pressing social issues.','Community','Online','Online','http://hackathon11.com',4.6,'2024-12-24 13:00:00'),(12,'Hackathon','AI Robotics Hack','Combining AI with robotics for enhanced automation.','Technology','Seoul, South Korea','In-person','http://hackathon12.com',4.7,'2024-12-27 09:00:00'),(13,'Hackathon','Creative Coding Marathon','Showcase your creative coding skills.','Art','Amsterdam, Netherlands','Online','http://hackathon13.com',4.5,'2024-12-31 17:00:00'),(14,'Hackathon','Open Data Solutions','Hack with open data to find impactful insights.','Data','Austin, USA','Hybrid','http://hackathon14.com',4.4,'2024-12-19 15:00:00'),(15,'Hackathon','Tech for Accessibility','Build tech solutions for greater accessibility.','Health','Mumbai, India','In-person','http://hackathon15.com',4.8,'2024-12-17 10:00:00');
/*!40000 ALTER TABLE `hackathon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webinar`
--

DROP TABLE IF EXISTS `webinar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webinar` (
  `id` int NOT NULL,
  `offering_type` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `category` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `platform` varchar(50) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `availability_schedule` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webinar`
--

LOCK TABLES `webinar` WRITE;
/*!40000 ALTER TABLE `webinar` DISABLE KEYS */;
INSERT INTO `webinar` VALUES (1,'Webinar','AI in Healthcare','Exploring the applications of AI in the healthcare industry.','Technology','Online','Zoom','http://webinar1.com',4.8,'2024-11-20 14:00:00'),(2,'Webinar','Blockchain Basics','Introduction to blockchain and its potential use cases.','Finance','Online','Webex','http://webinar2.com',4.6,'2024-11-22 16:00:00'),(3,'Webinar','Digital Marketing Trends 2024','A look at the upcoming trends in digital marketing for the year 2024.','Business','Online','Google Meet','http://webinar3.com',4.7,'2024-12-01 10:00:00'),(4,'Webinar','Cybersecurity Best Practices','Learn how to protect your data and maintain cybersecurity.','Technology','Online','Zoom','http://webinar4.com',4.9,'2024-12-05 13:00:00'),(5,'Webinar','Sustainable Energy Solutions','An overview of sustainable energy technologies and their implementation.','Environment','Online','Microsoft Teams','http://webinar5.com',4.5,'2024-12-10 15:00:00'),(6,'Webinar','AI Ethics and Challenges','Discussion on ethical implications and challenges in AI development.','Technology','Online','Google Meet','http://webinar6.com',4.4,'2024-11-25 11:00:00'),(7,'Webinar','Financial Planning for Startups','Essential tips and strategies for financial planning in startups.','Business','Online','Webex','http://webinar7.com',4.3,'2024-12-02 12:00:00'),(8,'Webinar','Leadership Skills for the Modern Age','Key leadership skills needed for modern organizations.','Leadership','Online','Zoom','http://webinar8.com',4.6,'2024-12-08 14:00:00'),(9,'Webinar','Data Science for Beginners','Introduction to data science concepts and applications.','Technology','Online','Microsoft Teams','http://webinar9.com',4.7,'2024-11-28 09:00:00'),(10,'Webinar','Climate Change Mitigation','Understanding climate change and steps towards mitigation.','Environment','Online','Google Meet','http://webinar10.com',4.8,'2024-12-15 17:00:00'),(11,'Webinar','Creative Writing Workshop','Interactive session to enhance your creative writing skills.','Art','Online','Zoom','http://webinar11.com',4.5,'2024-12-03 10:00:00'),(12,'Webinar','Introduction to Cloud Computing','Basics of cloud services and deployment models.','Technology','Online','Webex','http://webinar12.com',4.6,'2024-11-29 13:00:00'),(13,'Webinar','Negotiation Tactics for Professionals','Improve negotiation skills for better outcomes.','Business','Online','Microsoft Teams','http://webinar13.com',4.7,'2024-12-09 16:00:00'),(14,'Webinar','Quantum Computing Overview','Understanding the basics of quantum computing.','Technology','Online','Google Meet','http://webinar14.com',4.8,'2024-12-11 14:00:00'),(15,'Webinar','AI-Powered Marketing Strategies','Leveraging AI for effective marketing.','Business','Online','Zoom','http://webinar15.com',4.9,'2024-12-06 11:00:00'),(16,'Webinar','Mental Health Awareness','Discussion on mental health issues and support mechanisms.','Health','Online','Webex','http://webinar16.com',4.6,'2024-11-24 15:00:00'),(17,'Webinar','Robotics in Industry 4.0','The role of robotics in the new industrial revolution.','Technology','Online','Microsoft Teams','http://webinar17.com',4.5,'2024-12-07 13:00:00'),(18,'Webinar','Design Thinking Process','Workshop on implementing design thinking.','Innovation','Online','Google Meet','http://webinar18.com',4.7,'2024-12-04 10:00:00'),(19,'Webinar','Nutrition and Healthy Living','Tips for maintaining a healthy diet and lifestyle.','Health','Online','Zoom','http://webinar19.com',4.4,'2024-12-13 09:00:00'),(20,'Webinar','Entrepreneurship 101','Basics of starting your entrepreneurial journey.','Business','Online','Webex','http://webinar20.com',4.8,'2024-11-30 12:00:00'),(21,'Webinar','The Future of Work','Exploring how work will evolve in the next decade.','Business','Online','Google Meet','http://webinar21.com',4.5,'2024-12-12 15:00:00'),(22,'Webinar','Introduction to Machine Learning','Basic concepts and algorithms in machine learning.','Technology','Online','Zoom','http://webinar22.com',4.6,'2024-11-27 11:00:00'),(23,'Webinar','Effective Communication Skills','Learn to communicate effectively in any setting.','Leadership','Online','Webex','http://webinar23.com',4.3,'2024-12-14 14:00:00'),(24,'Webinar','Building a Startup from Scratch','Practical advice on launching a startup.','Business','Online','Microsoft Teams','http://webinar24.com',4.7,'2024-12-16 13:00:00'),(25,'Webinar','Art of Public Speaking','Master the art of public speaking and presentation.','Leadership','Online','Google Meet','http://webinar25.com',4.9,'2024-12-17 18:00:00');
/*!40000 ALTER TABLE `webinar` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-18 18:31:37
