var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "employee_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // viewEmployees()
    




    connection.end()
  });


  function viewEmployees() {
    connection.query("SELECT * FROM employees", (err,res) => {
        if (err) throw err;
            console.table(res)
  })
}

function viewEmployeesByDept(Department) {
    connection.query("SELECT * FROM department", (err,res) => {
        if (err) throw err;
            console.table(res)
  })
}