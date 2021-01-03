SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employees;

INSERT INTO department (name) VALUES ("Sales"), ("Marketing"), ("Finance");
INSERT INTO role (title, salary, department_id) VALUES ("Director of Sales", "100000", "1"), ("Salesperson", "80000", "1"), ("Director of marketing", "150000", "2"), ("Brand manager", "75000", "2"), ("Accountant", "125000", "3");
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Jack", "Straw", "1", "3"), ("Colonel", "Forbin", "2", "1"), ("Poster", "Nutbag", "3", "0"), ("Wharf", "Rat", "4", "3"), ("Casey", "Jones", "5", "0")