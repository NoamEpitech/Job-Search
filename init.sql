CREATE DATABASE IF NOT EXISTS app_database;

USE app_database;

CREATE TABLE IF NOT EXISTS `company` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL
);


CREATE TABLE IF NOT EXISTS `jobs` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    salary VARCHAR(50),

    company_id INT,
    FOREIGN KEY (company_id) REFERENCES company(id)
);


CREATE TABLE IF NOT EXISTS `users` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    is_admin BOOLEAN
);


CREATE TABLE IF NOT EXISTS `company_user` (
    id INT AUTO_INCREMENT PRIMARY KEY,

    company_id INT,
    user_id INT,
    FOREIGN KEY (company_id) REFERENCES company(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE IF NOT EXISTS `job_informations` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    information_type VARCHAR(50),
    information VARCHAR(1000),
    
    user_id INT,
    job_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);


