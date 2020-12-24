SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employees;

INSERT INTO department (name) VALUES ("Sales"), ("Engineering"), ("Finance");
INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", "100000", "1"), ("Salesperson", "80000", "1"), ("Lead Engineer", "15000", "2"), ("Software Engineer", "120000", "2"), ("Accountant", "125000", "3");
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("John", "Doe", "1", "3"), ("Mike", "Chan", "2", "1"), ("Ashley", "Rodriguez", "3", "0"), ("Kevin", "Tupik", "4", "3"), ("Malia", "Brown", "5", "0")