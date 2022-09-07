CREATE TABLE admins(
    admin_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email text UNIQUE,
    password VARCHAR(60) NOT NULL
);