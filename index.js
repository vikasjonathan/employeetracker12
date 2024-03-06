const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./config/connection");
const connection = require("./config/connection");
//prompt user which action they want to take
const promptUser = () => {
  //array of choices: view all departments, view all roles, view all employees,
  //add a department, add a role, add an employee, and update an employee role
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Please choose an option",
        choices: [
          "View All Employees",
          "Add Employee",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])

    //use conditional statement (if or switch)
    //choice is view all departments: execute viewAllDepartment function
    .then((answers) => {
      const { choices } = answers;
      console.log(choices);
      if (choices === "View All Employees") {
        viewAllEmployees();
      } else if (choices === "Add Employee") {
        addEmployee();
      } else if (choices === "View All Roles") {
        viewAllRoles();
      } else if (choices === "Add Role") {
        addRole();
      } else if (choices === "View All Departments") {
        viewAllDepartments();
      } else if (choices === "Add Department") {
        addDepartment();
      } else if (choices === "Update Employee Role") {
        updateEmployeeRole();
      } else if (choices === "Exit") {
        db.end();
      } else {
        console.log("No selection was matched");
      }
    });
};

// viewAllDepartment() {
const viewAllDepartments = () => {
  let query = "SELECT * FROM department";
  db.query(query, (err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser();
  });
};

//function viewAllRoles
const viewAllRoles = () => {
  let query = "SELECT * FROM role";
  db.query(query,(err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser();
  });
};
// view all employes
const viewAllEmployees = () => {
  let query = "SELECT * FROM employee";
  db.query(query,(err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser();
  });
};
//function to add department
const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "What is the new department called?",
    })
    .then((answer) => {
      let query = `INSERT INTO department (department_name) VALUES ("${answer.departmentName}")`;
      connection.promise().query(query)
      .then(() => {
          console.log(`Added ${answer.departmentName} department`);
          promptUser();
        });

    
    });
};