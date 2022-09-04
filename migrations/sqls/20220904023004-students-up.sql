CREATE TABLE students(
    stud_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email text UNIQUE,
    registeration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    password VARCHAR(60) NOT NULL
);