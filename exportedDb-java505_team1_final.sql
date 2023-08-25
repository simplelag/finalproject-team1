-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 58.239.58.243    Database: java505_team1_final
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basket` (
  `basket_pk` int NOT NULL AUTO_INCREMENT,
  `basket_sale_pk` int NOT NULL,
  `basket_member_id` varchar(255) NOT NULL,
  `basket_book_id` varchar(255) NOT NULL,
  `basket_book_price` int NOT NULL,
  `basket_book_cover` varchar(255) NOT NULL,
  `basket_book_pieces` int NOT NULL,
  `basket_book_title` varchar(255) NOT NULL,
  PRIMARY KEY (`basket_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='장바구니';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
INSERT INTO `basket` VALUES (11,7,'test2','9791192908236',5000,'https://image.aladin.co.kr/product/31892/3/cover/k342833636_1.jpg',1,'아메리칸 프로메테우스 (특별판) - 로버트 오펜하이머 평전'),(77,20,'user','9791158512767',5000,'https://image.aladin.co.kr/product/32289/45/cover/k852834850_1.jpg',2,'1%를 읽는 힘'),(78,7,'user','9791192908236',5000,'https://image.aladin.co.kr/product/31892/3/cover/k342833636_1.jpg',1,'아메리칸 프로메테우스 (특별판) - 로버트 오펜하이머 평전'),(79,22,'1234','9791192913285',0,'https://image.aladin.co.kr/product/32294/48/cover/k942834951_1.jpg',1,'제3제국사 - 전4권 - 히틀러의 탄생부터 나치 독일의 패망까지'),(102,20,'user','9791158512767',5000,'https://image.aladin.co.kr/product/32289/45/cover/k852834850_1.jpg',2,'1%를 읽는 힘'),(103,8,'user','9791192908236',10000,'https://image.aladin.co.kr/product/31892/3/cover/k342833636_1.jpg',1,'아메리칸 프로메테우스 (특별판) - 로버트 오펜하이머 평전'),(152,22,'user','9791192913285',0,'https://image.aladin.co.kr/product/32294/48/cover/k942834951_1.jpg',1,'제3제국사 - 전4권 - 히틀러의 탄생부터 나치 독일의 패망까지'),(154,8,'user','9791192908236',10000,'https://image.aladin.co.kr/product/31892/3/cover/k342833636_1.jpg',1,'아메리칸 프로메테우스 (특별판) - 로버트 오펜하이머 평전'),(155,23,'user','9791158512767',15000,'https://image.aladin.co.kr/product/32289/45/cover/k852834850_1.jpg',1,'1%를 읽는 힘'),(156,23,'user','9791158512767',15000,'https://image.aladin.co.kr/product/32289/45/cover/k852834850_1.jpg',1,'1%를 읽는 힘'),(157,23,'user','9791158512767',15000,'https://image.aladin.co.kr/product/32289/45/cover/k852834850_1.jpg',1,'1%를 읽는 힘'),(161,23,'user','9791158512767',15000,'https://image.aladin.co.kr/product/32289/45/cover/k852834850_1.jpg',1,'1%를 읽는 힘'),(167,8,'admin','9791192908236',10000,'https://image.aladin.co.kr/product/31892/3/cover/k342833636_1.jpg',1,'아메리칸 프로메테우스 (특별판) - 로버트 오펜하이머 평전'),(174,27,'asd','9791158512767',1500,'https://image.aladin.co.kr/product/32289/45/cover/k852834850_1.jpg',0,'1%를 읽는 힘');
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_pk` int NOT NULL AUTO_INCREMENT COMMENT '게시글 번호\n',
  `board_title` varchar(255) NOT NULL COMMENT '제목',
  `board_writer_id` varchar(255) DEFAULT NULL COMMENT '작성자 id (member 테이블의 member_id 참조)\n',
  `board_writer_name` varchar(255) DEFAULT NULL COMMENT '작성자 이름(member 테이블의 member_id 참조)\n',
  `board_category` varchar(255) DEFAULT NULL COMMENT '카테고리(자유/독후감/공지사항/관리자문의)\\n',
  `board_content` varchar(255) NOT NULL COMMENT '내용\n',
  `board_datetime` varchar(255) NOT NULL,
  `board_like` int NOT NULL DEFAULT '0' COMMENT '추천수(default 0)\n',
  `board_visit_count` int NOT NULL DEFAULT '0' COMMENT '조회수(default 0)\n',
  `board_edited` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`board_pk`),
  KEY `board_category_idx` (`board_category`),
  KEY `board_writer_id_idx` (`board_writer_id`),
  KEY `board_writer_name_idx` (`board_writer_name`),
  CONSTRAINT `board_category` FOREIGN KEY (`board_category`) REFERENCES `category` (`category_name`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `board_writer_id` FOREIGN KEY (`board_writer_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `board_writer_name` FOREIGN KEY (`board_writer_name`) REFERENCES `member` (`member_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시판 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'관리자문의','user','userName1','관리자문의','관리자문의내용','2023-08-08 00:00:00.000000',0,12,0),(7,'관리자문의2','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:07.000000',0,0,0),(8,'관리자문의3','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(9,'관리자문의4','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(10,'관리자문의5','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(11,'관리자문의6','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(12,'관리자문의7','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(13,'관리자문의8','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(14,'관리자문의9','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(15,'관리자문의10','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(16,'관리자문의11','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(17,'관리자문의12','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(18,'관리자문의13','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(19,'관리자문의14','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,2,0),(20,'관리자문의15','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(21,'관리자문의16','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(22,'관리자문의17','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(23,'관리자문의18','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(24,'관리자문의19','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(25,'관리자문의20','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,2,0),(26,'관리자문의21','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(27,'관리자문의22','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(28,'관리자문의23','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(29,'관리자문의24','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,4,0),(30,'관리자문의25','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,4,0),(31,'관리자문의26','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,0,0),(32,'관리자문의27','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,2,0),(33,'관리자문의28','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,6,0),(34,'관리자문의29','user','userName1','관리자문의','관리자문의내용','2023-08-08 16:08:28.000000',0,42,0),(45,'공지test','admin','adminName','공지/이벤트','공지test','2023-08-22 10:18:51.000000',0,11,0),(46,'추가공지','admin','adminName','공지/이벤트','추가공지사항입니다','2023-08-22 10:30:40.000000',1,14,0),(47,'글쓰기1','test','testEdited','일반','글쓰기11','2023-08-22 10:31:09.000000',0,14,0),(48,'글쓰기2','test','testEdited','독후감','글쓰기22','2023-08-22 10:31:19.000000',0,20,0),(49,'test ver1','admin','adminName','일반','test','2023-08-22 14:24:02.000000',1,4,0),(50,'문의합니다','admin','adminName','관리자문의','문의를합니다','2023-08-22 14:24:09.000000',0,0,0),(51,'이건 일반 게시글입니다','admin','adminName','일반','내용','2023-08-22 14:24:17.000000',0,8,0),(52,'독후감 게시글입니다','admin','adminName','독후감','내용2','2023-08-22 14:24:27.000000',0,8,0),(53,'공지용 게시글입니다','admin','adminName','공지/이벤트','^^7','2023-08-22 14:24:41.000000',0,18,0),(54,'문희','admin','adminName','관리자문의','나문희','2023-08-22 14:24:45.000000',0,0,0),(55,'문의 등록','admin','adminName','관리자문의','alert','2023-08-22 14:25:08.000000',0,21,0),(56,'아니','user','userName1','관리자문의','아니','2023-08-22 14:36:11.000000',0,6,0),(57,'1234','user','userName1','관리자문의','1234','2023-08-22 15:29:23.000000',0,0,0),(58,'1234','user','userName1','관리자문의','1234','2023-08-22 15:31:01.000000',0,0,0),(59,'12341','user','userName1','관리자문의','1234','2023-08-22 15:32:00.000000',0,2,0),(60,'123','user','userName1','관리자문의','123','2023-08-22 15:32:32.000000',0,2,0),(61,'214','user','userName1','관리자문의','1234','2023-08-22 15:33:41.000000',0,0,0),(62,'123455555','user','userName1','관리자문의','1234','2023-08-22 15:35:19.000000',0,0,0),(63,'파일`','user','userName1','관리자문의','팡ㄹ','2023-08-22 15:41:34.000000',0,0,0),(64,'파ㅣㅇㄹ','user','userName1','관리자문의','ㅍㅇ','2023-08-22 15:42:07.000000',0,0,0),(65,'파ㅣㅇㄹ','user','userName1','관리자문의','ㅍㅇ','2023-08-22 15:42:31.000000',0,0,0),(66,'3ㅍㅇ','user','userName1','관리자문의','ㅍㅇ','2023-08-22 15:43:08.000000',0,0,0),(67,'파일프로젝트','user','userName1','관리자문의','ㄹ','2023-08-22 15:49:31.000000',0,10,0),(68,'123ㅎㅎ','user','userName1','관리자문의','ㅎ','2023-08-22 15:51:35.000000',0,0,0),(69,'test','user1','홍길동','관리자문의','teset','2023-08-22 16:06:14.000000',0,0,0),(70,'db','user','userName1','관리자문의','db','2023-08-22 16:20:56.000000',0,14,0),(71,'db','user','userName1','관리자문의','db','2023-08-22 16:21:50.000000',0,2,0),(72,'db','user','userName1','관리자문의','db','2023-08-22 16:22:41.000000',0,2,0),(73,'db','user','userName1','관리자문의','db','2023-08-22 16:23:43.000000',0,0,0),(74,'123','user','userName1','관리자문의','123','2023-08-22 16:24:50.000000',0,26,0),(75,'이미지업로드테스트','user','userName1','관리자문의','ㅇㅇ','2023-08-22 17:04:05.000000',0,24,0),(76,'여름 이벤트!','admin','adminName','공지/이벤트','곧 종료됩니다!!','2023-08-22 17:13:02.000000',3,68,0),(78,'오늘의 독후감!','test2','test2','독후감','재밌었다!','2023-08-22 18:00:13.000000',0,13,0),(79,'fd','user','userName1','관리자문의','fd','2023-08-23 10:23:00.000000',0,12,0),(80,'1','admin','adminName','일반','1','2023-08-23 10:52:55.000000',0,0,0),(81,'2','admin','adminName','일반','2','2023-08-23 10:52:58.000000',0,0,0),(82,'3','admin','adminName','일반','3','2023-08-23 10:53:01.000000',0,0,0),(83,'5','admin','adminName','일반','5','2023-08-23 10:53:03.000000',0,0,0),(84,'6','admin','adminName','일반','6','2023-08-23 10:53:06.000000',0,2,0),(85,'7','admin','adminName','일반','7','2023-08-23 10:53:09.000000',0,2,0),(86,'8','admin','adminName','일반','8','2023-08-23 10:53:12.000000',0,0,0),(87,'test','test','testEdited','독후감','11','2023-08-23 11:47:31.000000',0,8,0),(88,'ㅁㄴㅇㅁ','asd','sad','독후감','ㄴㅁㅇㅁㄴㅇ','2023-08-23 13:53:47.000000',0,11,0),(89,'ㅇㅁㄴㅇㅁㄴ','asd','sad','일반','ㅇㄴㅁㅇㅁㄴㅇ','2023-08-23 13:54:29.000000',0,8,0),(90,'관리자가 관리자한테 문의','admin','adminName','관리자문의','ㅇㅇ','2023-08-23 15:49:23.000000',0,6,0),(91,'123','user','userName1','관리자문의','123','2023-08-24 16:10:26.000000',0,6,0),(92,'123img','test','testEdited','관리자문의','123','2023-08-24 21:45:29.000000',0,9,0),(93,'문의합니다','user','userName1','관리자문의','문의내용','2023-08-25 10:52:21.000000',0,8,0),(94,'관리자 문의','user','userName1','관리자문의','문의입니다','2023-08-25 15:35:22',0,6,0);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int NOT NULL AUTO_INCREMENT COMMENT '알라딘 api에서 가져온 도서의 itemid',
  `book_title` varchar(255) NOT NULL,
  `book_author` varchar(255) DEFAULT NULL,
  `book_standard_price` int NOT NULL COMMENT '새 책의 판매 가격',
  `book_category` varchar(255) DEFAULT NULL,
  `book_cover_url` varchar(200) NOT NULL COMMENT '표지 url',
  `bookcover_url` varchar(255) DEFAULT NULL,
  `bookstandard_price` double NOT NULL,
  `book_isbn` int NOT NULL,
  `saledate_time` varchar(255) DEFAULT NULL,
  `salepost_price` varchar(255) DEFAULT NULL,
  `book_cover` varchar(255) NOT NULL,
  `book_grade` int NOT NULL,
  `book_pieces` int NOT NULL,
  `book_price` int NOT NULL,
  `bookdiscription` varchar(255) DEFAULT NULL,
  `cover` varchar(255) NOT NULL,
  `date_time` datetime(6) NOT NULL,
  `disabled` varchar(255) DEFAULT NULL,
  `seller_id` varchar(255) NOT NULL,
  `seller_name` varchar(255) NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='알라딘 api 에서 가져온 도서 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_review`
--

DROP TABLE IF EXISTS `book_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_review` (
  `book_review_pk` int NOT NULL AUTO_INCREMENT COMMENT '판매자 평점 pk\\n',
  `book_review_buyer_id` varchar(255) NOT NULL,
  `book_review_buyer_name` varchar(255) NOT NULL,
  `book_review_grade` int NOT NULL,
  `book_review_title` varchar(255) NOT NULL,
  `book_review_content` varchar(255) NOT NULL,
  `book_review_datetime` varchar(255) NOT NULL,
  `book_review_isbn13` varchar(255) NOT NULL,
  PRIMARY KEY (`book_review_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='도서 리뷰';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_review`
--

LOCK TABLES `book_review` WRITE;
/*!40000 ALTER TABLE `book_review` DISABLE KEYS */;
INSERT INTO `book_review` VALUES (2,'test','test',5,'항상 재밌게 봅니다','1234','2023-08-23 15:23:53','9791192908236'),(4,'test','test',5,'쎄이야','쎄이얏!','2023-08-23 16:04:00','9791168473690'),(9,'test','test',5,'쎄이야','쎄이얏!','2023-08-23 16:04:10','9791168473690'),(10,'test','test',2,'1%를 읽는 힘을 얻으니 기분이 좋아요','99%를 잊어버렸어요','2023-08-23 16:05:06','9791158512767'),(11,'test','test',5,'항상 재밌게 봅니다','1234','2023-08-23 17:07:29','9791168473690'),(13,'test','test',4,'1234','1234','2023-08-23 17:39:33','9791192836188'),(14,'test','testEdited',6,'1%를 읽는 힘입니다.','만족스러운 내용이였어요','2023-08-24 10:51:25','9791158512767'),(15,'test','testEdited',10,'이제 되는거같아요','진짜 된다','2023-08-24 12:03:00','9791192908236'),(16,'test','test',10,'쎄이야','쎄이야','2023-08-24 12:30:40','9791168473690'),(23,'asd','sad',2,'1','1','2023-08-24 16:15:30','9791192908236'),(24,'asd','sad',1,'2','2','2023-08-24 16:19:35','9791168473690'),(25,'asd','sad',1,'3','3','2023-08-24 16:19:41','9791168473690'),(26,'asd','sad',1,'4','4','2023-08-24 16:19:51','9791141111625'),(27,'asd','sad',3,'12','32','2023-08-24 16:26:27','9791192836188'),(28,'asd','sad',4,'123','123','2023-08-24 16:27:02','9791192913285'),(29,'asd','sad',4,'123123','123123','2023-08-24 19:03:01','9791167771131'),(30,'asd','sad',5,'123','123123','2023-08-24 19:41:06','9791192908236'),(33,'test','testEdited',1,'리뷰어','1234','2023-08-24 21:09:34','9791168473690'),(36,'admin','adminName',5,'판매안한책리뷰','내용','2023-08-25 11:31:39','9791168611672'),(37,'user','userName1',4,'판매안한 책 리뷰','1234','2023-08-25 11:32:08','9791168611672'),(38,'user','userName1',10,'리뷰 제목','네','2023-08-25 15:31:04','9791141111625');
/*!40000 ALTER TABLE `book_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='board_category 도메인 설정을 위한 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('공지/이벤트'),('관리자문의'),('독후감'),('일반'),('자유');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_pk` int NOT NULL AUTO_INCREMENT,
  `comment_board_pk` int NOT NULL,
  `comment_content` varchar(255) NOT NULL,
  `comment_datetime` varchar(255) NOT NULL,
  `comment_num` int NOT NULL,
  `comment_writer_id` varchar(255) NOT NULL,
  `comment_writer_name` varchar(255) NOT NULL,
  PRIMARY KEY (`comment_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,34,'답변드렸습니다.','2023-08-12 12:37:29.699158',0,'testUserId','testUserName'),(2,34,'dd','2023-08-17 08:08:04.757268',0,'admin','adminName'),(7,40,'test5 asdasd','2023-08-18 16:34:28.000000',0,'admin','adminName'),(10,40,'test11 update','2023-08-18 16:28:50.000000',0,'admin','adminName'),(11,40,'test22 update22 asd','2023-08-18 16:34:22.000000',0,'admin','adminName'),(12,40,'test','2023-08-18 16:50:28.000000',0,'user','userName'),(13,40,'test2','2023-08-18 16:50:33.000000',0,'user','userName'),(18,33,'답변','2023-08-21 15:33:27.000000',0,'admin','adminName'),(23,46,'공지 확인했습니다!(테스트)','2023-08-22 10:31:35.000000',0,'test','test'),(24,55,'음2','2023-08-22 14:35:49.000000',0,'admin','adminName'),(25,56,'뭐가','2023-08-22 14:36:41.000000',0,'admin','adminName'),(26,76,'여름이벤트 많관부','2023-08-22 17:37:14.000000',0,'admin','adminName'),(27,76,'참여!!','2023-08-22 17:42:53.000000',0,'test','test'),(28,76,'불참..','2023-08-22 17:43:43.000000',0,'user','userName1'),(29,76,'참여하고 싶어요!','2023-08-22 18:02:15.000000',0,'test2','test2'),(30,79,'dd','2023-08-23 11:15:53',0,'user','userName1'),(31,90,'답변','2023-08-23 15:49:41',0,'admin','adminName'),(32,93,'답변 드렸습니다.','2023-08-25 11:01:47',0,'admin','adminName'),(33,94,'답변입니다','2023-08-25 15:35:48',0,'admin','adminName');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon`
--

DROP TABLE IF EXISTS `coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon` (
  `coupon_pk` int NOT NULL COMMENT '쿠폰 고유번호\n',
  `coupon_owner` varchar(200) NOT NULL COMMENT '쿠폰 소유자 id(member 테이블의 member_id 참조)\n',
  `coupon_discount_rate` int DEFAULT NULL COMMENT '쿠폰 할인율(퍼센티지 쿠폰인 경우)\n',
  `coupon_discount_price` int DEFAULT NULL COMMENT '쿠폰 할인가격(절대치 할인 쿠폰인경우)\n',
  `coupon_purchase_pk` int DEFAULT NULL COMMENT '쿠폰이 사용된 주문번호(default null)\n',
  `coupon_disabled` varchar(200) DEFAULT NULL COMMENT 'default null, 쿠폰이 사용중지된 사우, !null이면 사용불가\n',
  PRIMARY KEY (`coupon_pk`),
  KEY `coupon_owner_idx` (`coupon_owner`),
  CONSTRAINT `coupon_owner` FOREIGN KEY (`coupon_owner`) REFERENCES `member` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT=' 등록된 쿠폰 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon`
--

LOCK TABLES `coupon` WRITE;
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_pk` int NOT NULL COMMENT '이벤트 번호\n',
  `event_name` varchar(200) NOT NULL COMMENT '이벤트 이름(달력에 표시될 간단한 이름)\n',
  `event_date_from` datetime NOT NULL COMMENT '이벤트 시작일\n',
  `event_date_by` datetime DEFAULT NULL COMMENT '이벤트 종료일(null일땐 당일 이벤트)\n',
  `event_board_pk` int NOT NULL COMMENT '이벤트 관련 게시글\n',
  PRIMARY KEY (`event_pk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='이벤트정보를 저장하는 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `file_pk` int NOT NULL AUTO_INCREMENT,
  `file_board_pk` int NOT NULL,
  `file_name_saved` varchar(255) NOT NULL,
  `file_name_original` varchar(255) NOT NULL,
  PRIMARY KEY (`file_pk`),
  KEY `boardPk_idx` (`file_board_pk`),
  CONSTRAINT `boardPk` FOREIGN KEY (`file_board_pk`) REFERENCES `board` (`board_pk`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='파일업로드';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (3,74,'20230822162450882713_74_KakaoTalk_20230413_172208775.jpg','KakaoTalk_20230413_172208775.jpg'),(4,75,'20230822170406484690_75_파일테스트2.jpg','파일테스트2.jpg'),(6,90,'20230823154924827642_90_파일테스트2.jpg','파일테스트2.jpg'),(7,91,'20230824161027261070_91_파일테스트2.jpg','파일테스트2.jpg'),(8,92,'20230824214530140689_92_파일테스트2.jpg','파일테스트2.jpg'),(9,93,'20230825105222924154_93_문의.jpg','문의.jpg'),(10,94,'20230825153523750480_94_문의.jpg','문의.jpg');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `like_pk` int NOT NULL AUTO_INCREMENT COMMENT '좋아요 pk(실제 쓰이지는 않음)\\n',
  `like_member_id` varchar(200) NOT NULL COMMENT '좋아요 누른 사람(member 테이블의 member_id 참조)\n',
  `like_board_pk` int DEFAULT NULL COMMENT '좋아요 누른 게시글의 pk값\\n',
  `like_comment_pk` int DEFAULT NULL COMMENT '좋아요 누른 댓글의 pk값\\\\n',
  PRIMARY KEY (`like_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT=' 게시글, 댓글 좋아요 정보 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,'admin',3,NULL),(2,'user',3,NULL);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `like_pk` int NOT NULL AUTO_INCREMENT,
  `like_board_pk` int DEFAULT NULL,
  `like_comment_pk` int DEFAULT NULL,
  `like_member_id` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`like_pk`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (26,3,NULL,'test'),(27,5,NULL,'test'),(29,3,NULL,'user'),(30,5,NULL,'user'),(31,3,NULL,'admin'),(32,5,NULL,'admin'),(33,40,NULL,'test'),(36,40,NULL,'user'),(37,41,NULL,'user'),(39,41,NULL,'admin'),(40,43,NULL,'user'),(42,46,NULL,'test'),(43,49,NULL,'admin'),(44,76,NULL,'admin'),(45,76,NULL,'test'),(46,76,NULL,'user');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail`
--

DROP TABLE IF EXISTS `mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mail` (
  `mail_pk` int NOT NULL AUTO_INCREMENT COMMENT '쪽지 번호\\n',
  `mail_content` varchar(255) NOT NULL,
  `mail_from_id` varchar(255) NOT NULL,
  `mail_from_name` varchar(255) NOT NULL,
  `mail_datetime` varchar(255) NOT NULL,
  `mail_room` varchar(255) NOT NULL,
  `mail_unread` int NOT NULL DEFAULT '1',
  `mail_purchase_pk` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`mail_pk`),
  KEY `mail_from_id_idx` (`mail_from_id`),
  KEY `mail_from_name_idx` (`mail_from_name`),
  CONSTRAINT `mail_from_id` FOREIGN KEY (`mail_from_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mail_from_name` FOREIGN KEY (`mail_from_name`) REFERENCES `member` (`member_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=420 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='쪽지 테이블(판매자에게 문의)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail`
--

LOCK TABLES `mail` WRITE;
/*!40000 ALTER TABLE `mail` DISABLE KEYS */;
INSERT INTO `mail` VALUES (416,'안녕하세요','user','userName1','2023-08-25 15:38','25_user',0,0),(417,'안녕하세요','test','testEdited','2023-08-25 15:39','25_user',0,0),(418,'네','user','userName1','2023-08-25 15:39','25_user',0,0),(419,'네','user','userName1','2023-08-25 15:40','25_user',1,0);
/*!40000 ALTER TABLE `mail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` varchar(255) NOT NULL,
  `member_name` varchar(255) NOT NULL,
  `member_password` varchar(200) NOT NULL COMMENT '회원 비밀번호\n',
  `member_email` varchar(200) NOT NULL COMMENT '회원 이메일\n',
  `member_phone` varchar(15) NOT NULL COMMENT '회원 연락처\\n',
  `member_authority` varchar(45) NOT NULL DEFAULT 'user' COMMENT '회원 권한(default ''user'', 관리자 ''admin)\\n',
  `member_address` varchar(200) NOT NULL COMMENT '회원 주소\n',
  `member_datetime` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `member_name_UNIQUE` (`member_name`),
  UNIQUE KEY `UK_2o5j9k9wlu7s8sdcmfidsi1vo` (`member_id`,`member_name`),
  UNIQUE KEY `UK_gwo2bqx6j18klv1e8ql503n61` (`member_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='회원 정보 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('1234','123','1234','pol0258@naver.com','010-1234-1','user','46744/부산 강서구 미음산단로127번길 21 (구랑동, BNK금융그룹 IT센터)/네','2023-08-19 08:15:26.917454'),('aaaa','관리자입니다','1234','admin@bict.co.kr','010-1234-1234','admin','03048/서울 종로구 청와대로 1 (세종로, 청와대)/대통령실','2023-08-23 07:03:17.845065'),('admin','adminName','1234','admin@admin.com','010-1234-1234','admin','04518/서울 중구 덕수궁길 83 (정동, 미국대사관)/America','2023-08-23 07:04:19.463185'),('asd','sad','1234','das1135@naver.com','010-1234-1231','user','17532/경기 안성시 일죽면 판교길 6 (화봉리)/149번지15','2023-08-22 00:57:09.725184'),('block','허경영','1234','hky1234@naver.com','010-3323-3323','block','서울 강남구 테헤란로 416','2023-08-12 00:00:00.000000'),('test','testEdited','1234','ioia33@naver.com','010-1234-1123','user','46990/부산 사상구 가야대로 1 (감전동)/즈만','2023-08-24 05:50:13.468426'),('test2','test2','1234','1234@daum.net','010-1234-1234','user','38115/경북 경주시 덕동길 130-9 (덕동)/1234','2023-08-16 05:41:29.166544'),('testUserId','testUserName','1234','1234@1234','1234','user','부산','2023-08-06 00:00:00.000000'),('user','userName1','1234','user22@bict.co.kr','010-1234-1234','user','48022/부산 해운대구 반송순환로 100-58 (반송동, 부산지방경찰특공대)/경찰서','2023-08-22 00:53:00.274735'),('user1','홍길동','1234','usertest1@naver.com','010-1234-5678','user','부산 강서구 르노삼성대로 14 (신호동)135-2','2023-08-08 08:37:13.273115'),('user5','str','1234','str123@naver.com','010-3131-3131','admin','47247/부산 부산진구 서전로37번길 17-2 (전포동, 포세이돈비)/1003','2023-08-11 07:26:10.616967');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `purchase_pk` int NOT NULL AUTO_INCREMENT COMMENT '주문번호',
  `purchase_book_id` varchar(255) NOT NULL COMMENT '무슨 책인지(book 테이블의 bookId 참조)',
  `purchase_book_name` varchar(255) NOT NULL,
  `purchase_buyer_id` varchar(255) NOT NULL COMMENT '구매자 id(member 테이블의 member_id 참조)',
  `purchase_buyer_name` varchar(255) NOT NULL COMMENT '구매자 이름(member 테이블의 member_name 참조)',
  `purchase_seller_id` varchar(255) NOT NULL COMMENT '판매자 id(member 테이블의 member_id 참조)',
  `purchase_seller_name` varchar(255) NOT NULL COMMENT '판매자 이름(member 테이블의 member_name 참조)',
  `purchase_datetime` datetime(6) DEFAULT NULL,
  `purchase_parcel` int DEFAULT '0' COMMENT '"배송상태 default 0: 상품준비중, 1: 상품접수\\n2: 배송중, 3: 배송완료"\\n\\n',
  `purchase_state` int DEFAULT '0' COMMENT '"구매후 결과 default 0: 구매 전 상황, 1: 구매취소, 20: 반품신청, 21: 반품완료\\\\n30: 교환신청,31: 교환완료 4: 구매확정(수령 1주일후 판매자가 확정가능)"\\\\n',
  `purchase_payment` int DEFAULT '0' COMMENT '결제한 금액\\n',
  `purchase_post_number` varchar(255) DEFAULT NULL COMMENT '운송번호',
  `purchase_pament_type` int DEFAULT '0' COMMENT '결제 종류 (0부터 시작)',
  `purchase_mileage` int DEFAULT '0' COMMENT '사용한 마일리지\\n',
  `purchase_coupon` int DEFAULT '0' COMMENT '사용한 쿠폰으로 할인된 양\\n',
  `purchase_comment` varchar(255) DEFAULT NULL COMMENT '요청 메시지',
  `purchase_address` varchar(255) DEFAULT NULL COMMENT '배송 주소',
  `purchase_number` int DEFAULT '1' COMMENT '구입하는 수량',
  PRIMARY KEY (`purchase_pk`),
  KEY `purchase_book_id_idx` (`purchase_book_id`),
  KEY `purchase_buyer_id_idx` (`purchase_buyer_id`),
  KEY `purchase_buyer_name_idx` (`purchase_buyer_name`),
  KEY `purchase_seller_id_idx` (`purchase_seller_id`),
  KEY `purchase_seller_name_idx` (`purchase_seller_name`),
  CONSTRAINT `purchase_buyer_id` FOREIGN KEY (`purchase_buyer_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `purchase_buyer_name` FOREIGN KEY (`purchase_buyer_name`) REFERENCES `member` (`member_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `purchase_seller_id` FOREIGN KEY (`purchase_seller_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `purchase_seller_name` FOREIGN KEY (`purchase_seller_name`) REFERENCES `member` (`member_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=350 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='사용자가 도서 구입시 생성되는 정보(주문번호 등)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

LOCK TABLES `purchase` WRITE;
/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` VALUES (271,'9788901272580','역행자 확장판 - 돈·시간·운명으로부터 완전한 자유를 얻는 7단계 인생 공략집','user','userName1','asd','sad','2023-08-24 13:04:24.087578',0,1,15000,NULL,0,0,0,'문앞에 나둬주세요','48022/부산 해운대구 반송순환로 100-58 (반송동, 부산지방경찰특공대)/경찰서',2),(337,'9791192908236','아메리칸 프로메테우스 (특별판) - 로버트 오펜하이머 평전','test','testEdited','asd','sad','2023-08-25 06:04:03.800340',0,1,10000,NULL,0,0,0,'','46990/부산 사상구 가야대로 1 (감전동)/ㅇㄹㅇㄹㅇ',1),(338,'9791141111625','안녕, 에리 (한정판) - 스페셜 단행본 + 필름북과 필름 + 스페셜 티켓 + 종이 엽서 12종 + 한정판 박스','test','testEdited','test','testEdited','2023-08-25 06:04:03.870995',0,1,12000,NULL,0,0,0,'','46990/부산 사상구 가야대로 1 (감전동)/ㅇㄹㅇㄹㅇ',1),(349,'9791158512767','1%를 읽는 힘','asd','sad','user','userName1','2023-08-25 06:44:24.151762',3,1,1500,'1',0,0,0,'문앞에 나둬주세요','17532/경기 안성시 일죽면 판교길 6 (화봉리)/149번지15',1);
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale`
--

DROP TABLE IF EXISTS `sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale` (
  `sale_pk` int NOT NULL AUTO_INCREMENT COMMENT '중고 상품의 고유 번호(bookId와는 다름)',
  `sale_book_id` varchar(255) NOT NULL,
  `sale_img_src` varchar(255) NOT NULL,
  `sale_seller_id` varchar(255) NOT NULL,
  `sale_seller_name` varchar(255) NOT NULL,
  `sale_book_price` int NOT NULL COMMENT '판매 가격',
  `sale_post_price` varchar(255) NOT NULL,
  `sale_book_pieces` int DEFAULT '1' COMMENT '판매 수량 default 값 1',
  `sale_disabled` varchar(255) DEFAULT NULL,
  `sale_discription` varchar(255) NOT NULL,
  `sale_book_success` tinyint NOT NULL DEFAULT '0' COMMENT '지금은 판매전 : 0, 판매 완료 : 1',
  `book_grade` int NOT NULL,
  `sale_date_time` varchar(255) NOT NULL,
  `sale_book_title` varchar(255) NOT NULL,
  PRIMARY KEY (`sale_pk`,`sale_book_id`),
  KEY `book_id_idx` (`sale_book_id`),
  KEY `sale_seller_name_idx` (`sale_seller_name`),
  KEY `memberName_idx` (`sale_seller_name`),
  CONSTRAINT `sale_seller_name` FOREIGN KEY (`sale_seller_name`) REFERENCES `member` (`member_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='판매자가 등록한 도서 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale`
--

LOCK TABLES `sale` WRITE;
/*!40000 ALTER TABLE `sale` DISABLE KEYS */;
INSERT INTO `sale` VALUES (8,'9791192908236','https://image.aladin.co.kr/product/31892/3/cover/k342833636_1.jpg','asd','sad',10000,'0',0,NULL,'1',0,0,'2023-08-16 06:36:46.536002','아메리칸 프로메테우스 (특별판) - 로버트 오펜하이머 평전'),(18,'9791192775265','https://image.aladin.co.kr/product/32287/76/cover/k962834757_1.jpg','test','testEdited',11000,'0',3,NULL,'이상무',0,2,'2023-08-17 05:02:53.440293','회사를 퇴사하고 갓생에 입사했습니다! - 일 잘하던 ‘8년 차 이대리’는 왜 퇴사했을까? 혹시 N잡러?'),(21,'9791168473690','https://image.aladin.co.kr/product/30929/51/cover/s302832892_1.jpg','user','userName1',1200,'0',1,'상태가 나쁘면 팔지마십시오','책 팝니다..',0,3,'2023-08-18 11:00:04.166260','세이노의 가르침'),(22,'9791192913285','https://image.aladin.co.kr/product/32294/48/cover/k942834951_1.jpg','1234','123',0,'0',1,'흠..','상태좋아요',0,1,'2023-08-19 08:25:42.568901','제3제국사 - 전4권 - 히틀러의 탄생부터 나치 독일의 패망까지'),(23,'9791158512767','https://image.aladin.co.kr/product/32289/45/cover/k852834850_1.jpg','asd','sad',15000,'0',2,'asda','좋음',0,1,'2023-08-22 09:56:03.000000','1%를 읽는 힘'),(25,'9791141111625','https://image.aladin.co.kr/product/32327/21/cover/k752935066_1.jpg','test','testEdited',14000,'0',1,NULL,'커버도 뜯지 않음,하지만 부수품은 손상되어 동봉하지 않음',0,1,'2023-08-25 10:10:52','안녕, 에리 (한정판) - 스페셜 단행본 + 필름북과 필름 + 스페셜 티켓 + 종이 엽서 12종 + 한정판 박스'),(26,'9791141111625','https://image.aladin.co.kr/product/32327/21/cover/k752935066_1.jpg','test','testEdited',12000,'0',0,NULL,'북커버 상태가 좋지 않음',0,2,'2023-08-25 10:46:12','안녕, 에리 (한정판) - 스페셜 단행본 + 필름북과 필름 + 스페셜 티켓 + 종이 엽서 12종 + 한정판 박스'),(27,'9791158512767','https://image.aladin.co.kr/product/32289/45/cover/k852834850_1.jpg','user','userName1',1500,'0',0,NULL,'판매',0,1,'2023-08-25 15:29:57','1%를 읽는 힘'),(28,'9791141111625','https://image.aladin.co.kr/product/32327/21/cover/k752935066_1.jpg','user','userName1',5000,'0',1,'판매중지','상태 좋아요',0,1,'2023-08-25 15:30:36','안녕, 에리 (한정판) - 스페셜 단행본 + 필름북과 필름 + 스페셜 티켓 + 종이 엽서 12종 + 한정판 박스');
/*!40000 ALTER TABLE `sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller_review`
--

DROP TABLE IF EXISTS `seller_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller_review` (
  `seller_review_pk` int NOT NULL COMMENT '판매자 평점 pk\n',
  `seller_review_grade` tinyint NOT NULL COMMENT '판매자 평점 1~10점\n',
  `seller_review_buyer_id` varchar(200) NOT NULL COMMENT '구매자 id(member 테이블 member_id 참조)\n',
  `seller_review_buyer_name` varchar(200) NOT NULL COMMENT '구매자 이름(member 테이블 member_name 참조)\n',
  `seller_review_seller_id` varchar(200) NOT NULL COMMENT '판매자 id (member 테이블 member_id 참조)\n',
  `seller_review_seller_name` varchar(200) NOT NULL COMMENT '판매자 이름 (member 테이블 member_name 참조)\n',
  PRIMARY KEY (`seller_review_pk`),
  KEY `seller_review_buyer_id_idx` (`seller_review_buyer_id`),
  KEY `seller_review_buyer_name_idx` (`seller_review_buyer_name`),
  KEY `seller_review_seller_id_idx` (`seller_review_seller_id`),
  KEY `seller_review_seller_name_idx` (`seller_review_seller_name`),
  CONSTRAINT `seller_review_buyer_id` FOREIGN KEY (`seller_review_buyer_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `seller_review_buyer_name` FOREIGN KEY (`seller_review_buyer_name`) REFERENCES `member` (`member_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `seller_review_seller_id` FOREIGN KEY (`seller_review_seller_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `seller_review_seller_name` FOREIGN KEY (`seller_review_seller_name`) REFERENCES `member` (`member_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller_review`
--

LOCK TABLES `seller_review` WRITE;
/*!40000 ALTER TABLE `seller_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `seller_review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'java505_team1_final'
--

--
-- Dumping routines for database 'java505_team1_final'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-25 16:16:11
