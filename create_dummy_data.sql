-- SQL script to insert dummy data
-- Assuming you have already created the database and tables

USE app_database;

-- Insert users
INSERT INTO user (email, password, first_name, last_name, is_admin)
VALUES ('user1@example.com', 'password1', 'John', 'Doe', 0),
       ('user2@example.com', 'password2', 'Jane', 'Smith', 1),
       ('user3@example.com', 'password3', 'Alice', 'Johnson', 0),
       ('user4@example.com', 'password4', 'Bob', 'Smith', 1);

-- Insert companies
INSERT INTO company (name, hq_location)
VALUES ('Tech Corp', 'Silicon Valley'),
       ('Data Co', 'New York'),
       ('Web Dev Inc', 'Los Angeles'),
       ('Data Analytics Co', 'San Francisco');

-- Insert jobs
INSERT INTO job (title, description, salary, company_id)
VALUES ('Software Engineer', 'Description for Software Engineer job.', '75000', 1),
       ('Data Analyst', 'Description for Data Analyst job.', '60000', 2),
       ('Web Developer', 'Description for Web Developer job.', '70000', 1),
       ('Data Scientist', 'Description for Data Scientist job.', '80000', 3);