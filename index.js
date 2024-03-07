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
let roleChoices;
let managerChoices;
let employeeChoices;

const addEmployee = () => {

  let query = 'SELECT * FROM role';
  db.query(query,(error, res)=>{
    roleChoices = res.map(role =>({
      name: role.title,
      value: role.id
    }));
    let query = 'SELECT * FROM employee';
    db.query(query,(error, res)=>{
      managerChoices = res.map(({id, first_name, last_name}) => ({
      name: `${first_name} ${last_name}`,
      value: id

      }));
    
        inquirer
          .prompt ([
          {
            type: "input",
            name: "first_name",
            message: "What is the new employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the new employee's role?",
            choices: roleChoices,
          },
          {  
            type: "list",
            name: "managerChoices",
            message: "Who is the new employee's manager?",
            choices: managerChoices,
          },
        ])
        .then((answer) => {
         let query = `INSERT INTO employee SET first_name = '${answer.first_name}',
         last_name = '${answer.last_name}', role_id = '${answer.role_id}', manager_id = '${answer.managerChoices}';`
         db.query(query, (err,res) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Added Employee");
          promptUser();
         });
        });
      });
     }); 
  };
  //function to add a Role
const addRole = () => {
  let query = "SELECT * FROM department";
  connection.promise().query(query)
    .then(([data]) => {
      let deptNames = [];
      data.forEach((department) => {
        deptNames.push(department.department_name);
      });
     
      inquirer
        .prompt([
          {
            type: "list",
            name: "departmentName",
            message: "Which department is the new role in?",
            choices: deptNames,
          },
        ])
        .then((answer) => {
          if (answer.departmentName === "Create Department") {
            this.addDepartment();
          } else {
            addRoleData(answer);
          }
        });
      let addRoleData = (departmentData) => {
        inquirer
          .prompt([
            {
              type: "input",
              name: "newRole",
              message: "What is the new role called?",
      
            },
            {
              type: "input",
              name: "salary",
              message: " What is the salary for this role",
            },
          ])
          .then((answer) => {
            let newRole = answer.newRole;
            let departmentId;
            data.forEach((department) => {
              if (
                departmentData.departmentName === department.department_name
              ) {
                departmentId = department.id;
              }
            });
            let addedRole = [newRole, answer.salary, departmentId];
            connection.query('INSERT INTO role SET ?', {
             salary: answer.salary,
             title: answer.newRole,
             department_id: departmentId }, (error => { 
            
               if (error) throw error;
             console.log("Role added.");
             promptUser();
          }));
        });
    };
  });
}
const updateEmployeeRole = () => {

  let query = "SELECT * FROM employee";
  db.query(query,(error, res)=>{
    employeeChoices = res.map(({id, first_name, last_name}) => ({
    name: `${first_name} ${last_name}`,
    value: id
   }));

  let query = "SELECT * FROM role";
  db.query(query,(error, res)=>{
     roleChoices = res.map(role =>({
       name: role.title,
       value: role.id
     }));

     let query = "SELECT * FROM employee";
    db.query(query,(error, res)=>{
      managerChoices = res.map(({id, first_name, last_name, manager_id}) => ({
      name: `${first_name} ${last_name}`,
      value: id

      }));

    inquirer
     .prompt ([
     {
      type: "list",
      name: "employeeChoices",
      message: "Which employee's role do you wish to change?",
      choices: employeeChoices
     },
     {
      type: "list",
      name: "roleChoices",
      message: "Which role would you like this employee in?",
      choices: roleChoices
     },
     {
      type: "list",
      name: "managerChoices",
      message: "Who is this employee's manager?",
      choices: managerChoices
     },
   ])
   .then((answer) => {
    let query = `UPDATE INTO employee SET role_id ='${answer.roleChoices}', manager_id = '${answer.managerChoices}', employee_id = '${answer.employeeChoices}',WHERE id = '${answer.employeeChoices}';`
    db.query(query, (err,res) => {
     if (err) {
       console.log(err);
       return;
     }
     console.log("Employee has been updated.");
     promptUser();
    });
   });
 });
}); 
});
}

        

promptUser();