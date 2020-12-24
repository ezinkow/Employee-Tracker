DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL(10,4) NULL,
    department_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NULL,
    manager_id INT NULL REFERENCES employees(id),
    PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employees;

-- INSERT INTO department (name) VALUES ("Sales"), ("Engineering"), ("Finance");
-- INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", "100000", "1"), ("Salesperson", "80000", "1"), ("Lead Engineer", "15000", "2"), ("Software Engineer", "120000", "2"), ("Accountant", "125000", "3");
-- INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", "1", "3"), ("Mike", "Chan", "2", "1"), ("Ashley", "Rodriguez", "3", "0"), ("Kevin", "Tupik", "4", "3"), ("Malia", "Brown", "5", "0")

