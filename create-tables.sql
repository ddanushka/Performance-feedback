CREATE DATABASE `performancefeedback`;
CREATE TABLE `employee` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(200) NOT NULL,
  `employee_position` varchar(200) NOT NULL,
  `employee_department` varchar(200) NOT NULL,
  `employee_email` varchar(200) NOT NULL,
  `employee_password` varchar(400) NOT NULL,
  `isadmin` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_id_UNIQUE` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `assignee_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `quality_work` int DEFAULT NULL,
  `ability_work_team` int DEFAULT NULL,
  `open_feedback` int DEFAULT NULL,
  `communication` int DEFAULT NULL,
  `improve_comment` longtext,
  `general_feedback` longtext,
  `avgall` double DEFAULT '0',
  `completed` int DEFAULT '0',
  PRIMARY KEY (`feedback_id`),
  UNIQUE KEY `feedback_id_UNIQUE` (`feedback_id`),
  KEY `employee_id_idx` (`assignee_id`),
  KEY `receive_employee_id_idx` (`receiver_id`),
  CONSTRAINT `assign_employee_id` FOREIGN KEY (`assignee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `receive_employee_id` FOREIGN KEY (`receiver_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
