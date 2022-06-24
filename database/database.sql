CREATE DATABASE crudpg;

/*USE TABLE*/
\c crudpg;

/*CREATE TABLE*/
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    email TEXT
);

/*SELECT*/
SELECT *
FROM users

/*SELECT ONE*/
SELECT *
FROM users
WHERE users.id = 1;

/*INSERT*/
INSERT INTO users(nombre, email)
VALUES ('Alvaro', 'alvaro@gmail.com'),
('Fer', 'fer@gmail.com');

/*UPDATE*/
UPDATE users
SET nombre='Alva2'
WHERE id=1;

/*DELETE*/
DELETE 
FROM users
WHERE id=5;