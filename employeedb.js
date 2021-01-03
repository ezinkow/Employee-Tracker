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
});

function questions() {
    inquirer
        .prompt({
            name: "toDo",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View",
                "Add",
                "Remove",
                "Update"
            ]
        })

        .then(function (nextStep) {
            switch (nextStep.toDo) {
                case "View":
                    view();
                    break;
                case "Add":
                    add();
                    break;
                case "Remove":
                    remove();
                    break;
                case "Update":
                    update();
                    break;
            }

        })
}

questions()

function view() {
    inquirer
        .prompt({
            name: "viewWhat",
            type: "rawlist",
            message: "What would you like to view?",
            choices: [
                "View all employees by ID",
                "View all employees by last name",
                "View all departments",
                "View all roles",
                "View all employees by department",
                "View all employees by manager",
                "View all employees by role"
            ]
        })

        .then(function (view) {
            switch (view.viewWhat) {
                case "View all employees by ID":
                    viewEmployees();
                    break;
                case "View all employees by last name":
                    viewEmployeesLastName();
                    break;
                case "View all departments":
                    viewAllDepartments();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break
                case "View all employees by department":
                    viewDepartments();
                    break;
                case "View all employees by manager":
                    viewManagers();
                    break;
                case "View all employees by role":
                    viewRoles();
                    break;

            }

        })
}

function viewEmployees() {
    var query = "SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS Name, role.title AS Title, role.salary as Salary, department.name as Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM (((employees LEFT JOIN role ON employees.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employees m ON m.id = employees.manager_id)";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })

}

function viewEmployeesLastName() {
    var query = "SELECT employees.id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', role.title AS Title, role.salary as Salary, department.name as Department, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM (((employees LEFT JOIN role ON employees.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employees m ON m.id = employees.manager_id) ORDER BY employees.last_name ASC";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })


}

function viewAllDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function viewAllRoles() {
    var query = "SELECT role.id AS 'ID', title AS Title, department.name as Department, role.department_id AS 'Department ID', salary AS Salary FROM role LEFT JOIN department ON role.department_id = department.id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function viewDepartments() {
    var query = "SELECT employees.id, CONCAT(employees.first_name, ' ',employees.last_name) AS Name, department.name AS Department FROM ((employees LEFT JOIN role ON employees.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) ORDER BY department.name ASC";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}



function viewManagers() {
    var query = "SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS Name, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM employees LEFT JOIN employees m ON m.id = employees.manager_id ORDER BY CONCAT(m.first_name, ' ', m.last_name)";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function viewRoles() {
    var query = "SELECT employees.id, CONCAT(employees.first_name, ' ',employees.last_name) AS Name, role.title AS Role, department.name as Department FROM ((employees LEFT JOIN role on employees.role_id = role.id) LEFT JOIN department ON role.department_id = department.id)";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function add() {
    inquirer
        .prompt({
            name: "addWhat",
            type: "rawlist",
            message: "What would you like to add?",
            choices: [
                "Add employee",
                "Add department",
                "Add role"
            ]
        })

        .then(function (add) {
            switch (add.addWhat) {
                case "Add employee":
                    addEmployee();
                    break;
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
            }

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
                type: "input",
                message: "Employee's role ID?"
            },
            {
                name: "manager",
                type: "input",
                message: "Employee's manager ID? (0 for none)"
            }
        ])

        .then(function (answer) {
            var query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)";
            connection.query(query,
                [answer.firstName, answer.lastName, Number(answer.role), Number(answer.manager)], (err, res) => {
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
            var query = "INSERT INTO department (name) VALUES(?)";
            connection.query(query, [answer.departmentName], (err, res) => {
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
            var query = "INSERT INTO role (title, salary, department_id) VALUES(?,?,?)";
            connection.query(query, [answer.roleName, answer.salary, Number(answer.departmentID)], (err, res) => {
                if (err) console.log("Department does not exist");
                console.table(res)
                questions()
            })
        })
}

function remove() {
    inquirer
        .prompt({
            name: "removeWhat",
            type: "rawlist",
            message: "What would you like to remove?",
            choices: [
                "Remove employee",
                "Remove department",
                "Remove role"
            ]
        })

        .then(function (remove) {
            switch (remove.removeWhat) {
                case "Remove employee":
                    removeEmployee();
                    break;
                case "Remove department":
                    removeDepartment();
                    break;
                case "Remove role":
                    removeRole();
                    break;
            }

        })
}
function removeEmployee() {
    inquirer
        .prompt([
            {
                name: "selectEmployeeId",
                type: "input",
                message: "Employee's id number to delete?"
            },
        ])

        .then(function (answer) {
            var query = "DELETE FROM employees WHERE id=?";
            connection.query(query, [Number(answer.selectEmployeeId)], (err, res) => {
                if (err) throw err;
                console.log("Employee deleted")
                console.table(res)
                questions()
            })
        })
}

function removeDepartment() {
    inquirer
        .prompt([
            {
                name: "selectDepartmentId",
                type: "input",
                message: "Department id number to delete?"
            },
        ])

        .then(function (answer) {
            var query = "DELETE FROM department WHERE id=?";
            connection.query(query, [Number(answer.selectDepartmentId)], (err, res) => {
                if (err) console.log("Must first change roles within department");
                console.table(res)
                questions()
            })
        })
}

function removeRole() {
    inquirer
        .prompt([
            {
                name: "selectRoleId",
                type: "input",
                message: "Role id number to delete?"
            },
        ])

        .then(function (answer) {
            var query = "DELETE FROM role WHERE id=?";
            connection.query(query, [Number(answer.selectRoleId)], (err, res) => {
                if (err) throw err;
                console.log("Role deleted")
                console.table(res)
                questions()
            })
        })
}

function update() {
    inquirer
        .prompt({
            name: "updateWhat",
            type: "rawlist",
            message: "What would you like to update?",
            choices: [
                "Update employee's first name",
                "Update employee's last name",
                "Update employee's role",
                "Update role's department",
                "Update employee's manager"
            ]
        })

        .then(function (update) {
            switch (update.updateWhat) {
                case "Update employee's first name":
                    updateFirstName();
                    break;
                case "Update employee's last name":
                    updateLastName();
                    break;
                case "Update employee's role":
                    updateRole();
                    break;
                case "Update role's department":
                    updateRoleDepartment();
                    break;
                case "Update employee's manager":
                    updateManager();
                    break;
            }

        })
}

function updateFirstName() {
    inquirer
        .prompt([
            {
                name: "selectEmployeeId",
                type: "input",
                message: "Employee's id number?"
            },
            {
                name: "newFirstName",
                type: "input",
                message: "Employee's new first name?"
            },
        ])

        .then(function (answer) {
            var query = "UPDATE employees SET first_name = ? WHERE id=?";
            connection.query(query, [answer.newFirstName, Number(answer.selectEmployeeId)], (err, res) => {
                if (err) throw err;
                console.log("Employee updated")
                console.table(res)
                questions()
            })
        })
}

function updateLastName() {
    inquirer
        .prompt([
            {
                name: "selectEmployeeId",
                type: "input",
                message: "Employee's id number?"
            },
            {
                name: "newLastName",
                type: "input",
                message: "Employee's new Last name?"
            },
        ])

        .then(function (answer) {
            var query = "UPDATE employees SET last_name = ? WHERE id=?";
            connection.query(query, [answer.newLastName, Number(answer.selectEmployeeId)], (err, res) => {
                if (err) throw err;
                console.log("Employee updated")
                console.table(res)
                questions()
            })
        })
}

function updateRole() {
    inquirer
        .prompt([
            {
                name: "selectEmployeeId",
                type: "input",
                message: "Employee's id number?"
            },
            {
                name: "newRole",
                type: "input",
                message: "Employee's new role ID?"
            },
        ])

        .then(function (answer) {
            var query = "UPDATE employees SET role_id = ? WHERE id=?";
            connection.query(query, [Number(answer.newRole), Number(answer.selectEmployeeId)], (err, res) => {
                if (err) throw err;
                console.log("Role updated")
                console.table(res)
                questions()
            })
        })
}

function updateRoleDepartment() {
    inquirer
        .prompt([
            {
                name: "selectRoleId",
                type: "input",
                message: "Role's id number?"
            },
            {
                name: "newDepartment",
                type: "input",
                message: "Role's new department ID?"
            },
        ])

        .then(function (answer) {
            var query = "UPDATE role SET department_id = ? WHERE id=?";
            connection.query(query, [Number(answer.newDepartment), Number(answer.selectRoleId)], (err, res) => {
                if (err) throw err;
                console.log("Department updated")
                console.table(res)
                questions()
            })
        })
}
function updateManager() {
    inquirer
        .prompt([
            {
                name: "selectEmployeeId",
                type: "input",
                message: "Employee's id number?"
            },
            {
                name: "newManager",
                type: "input",
                message: "Employee's new manager ID? (0 for none)"
            },
        ])

        .then(function (answer) {
            var query = "UPDATE employees SET manager_id = ? WHERE id=?";
            connection.query(query, [Number(answer.newManager), Number(answer.selectEmployeeId)], (err, res) => {
                if (err) throw err;
                console.log("Manager updated")
                console.table(res)
                questions()
            })
        })
}