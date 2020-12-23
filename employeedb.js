var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    multipleStatements: true,
    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // viewEmployees()
});

function questions() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                //min (next 3)
                "View all employees",
                "View all employees by Department",
                "View all employees by Manager",
                "View all employees by Role",
                //min (next 3)
                "Add employee",
                "Add department",
                "Add role",
                //bonus
                "Remove employee",
                //min
                "Update employee Role",
                //bonus
                "View the total utilized budget of a department"
            ]
        })

        .then(function (nextStep) {
            switch (nextStep.action) {
                case "View all employees":
                    viewEmployees();
                    break;
                case "View all employees by Department":
                    viewDepartments();
                    break;
                case "View all employees by Manager":
                    viewManagers();
                    break;
                case "View all employees by Role":
                    viewRoles();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Remove employee":
                    removeEmployee();
                    break;
                case "Update employee role":
                    addRole();
                case "exit":
                    connection.end();
                    break;
            }

        })
}

questions()

function viewEmployees() {
    var query = "SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS Name, role.title AS Title, role.salary as Salary, department.name as Department FROM ((employees INNER JOIN role ON employees.id = role.id) INNER JOIN department ON employees.id = department.id)";

    var query2 = "SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS Name, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees INNER JOIN employees m ON m.id = employees.manager_id";

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })

}

function viewDepartments() {
    var query = "SELECT CONCAT(employees.first_name, ' ',employees.last_name) AS Name, department.name AS Department FROM employees INNER JOIN department on employees.id = department.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function viewManagers() {
    var query = "SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS Name, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees LEFT JOIN employees m ON m.id = employees.manager_id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function viewRoles() {
    var query = "SELECT CONCAT(employees.first_name, ' ',employees.last_name) AS Name, role.title AS Role FROM employees INNER JOIN role on employees.id = role.id"
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "Employee first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "Employee last name?"
            },
            {
                name: "role",
                type: "rawlist",
                message: "Employee's role ID?",
                choices: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7
                    // "Sales Lead",
                    // "Salesperson",
                    // "Lead Engineer",
                    // "Software Engineer",
                    // "Accountant",
                    // "Legal Team Lead",
                    // "Lawyer"
                ]
            },
            {
                name: "manager",
                type: "rawlist",
                message: "Employee's manager ID?",
                choices: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    // "John Doe",
                    // "Mike Chan",
                    // "Ashley Rodriguez",
                    // "Kevin Tupik",
                    // "Malia Brown",
                    // "Sarah Lourd",
                    // "Tom Allen",
                    "None"
                ]
            }
        ])

        .then(function (answer) {
            var query = "INSERT INTO employees SET ?";
            connection.query(query, { first_name: answer.firstName, last_name: answer.lastName, role_id: answer.role, manager_id: answer.manager }, (err, res) => {
                if (err) throw err;
                console.log("Employee added")
                console.table(res)
                questions()
            })
        })
}

function addDepartment() {
    inquirer
        .prompt(
            {
                name: "departmentName",
                type: "input",
                message: "What is the new department name?"
            }
        )

        .then(function (answer) {
            var query = "INSERT INTO department SET ?";
            connection.query(query, { name: answer.departmentName }, (err, res) => {
                if (err) throw err;
                console.log("Department added")
                console.table(res)
                questions()
            })
        })
}

function addRole() {
    inquirer
        .prompt([
            {
                name: "roleName",
                type: "input",
                message: "What is the new role name?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is this role's salary?"
            },
            {
                name: "departmentID",
                type: "input",
                message: "What is this role's department ID number?"
            }
        ])

        .then(function (answer) {
            var query = "INSERT INTO role SET ?";
            connection.query(query, { title: answer.roleName, salary: answer.salary, department_id: answer.departmentID }, (err, res) => {
                if (err) throw err;
                console.log("Department added")
                console.table(res)
                questions()
            })
        })
}

function removeEmployee()