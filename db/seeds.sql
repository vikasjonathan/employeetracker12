INSERT INTO department(department_name)
VALUES 
("Executive"), 
("Marketing"), 
("Sales"), 
("Accounting"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
("CEO", 350000, 1),
("Sales Manager", 90000, 3),
("Sales Person", 65000, 3),
("Marketing Manager",70000, 2),
("Marketing Assistant", 50000, 2),
("Accounting Manager", 70000, 4),
("Accountant", 55000, 4), 
("Chief Consule", 200000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John","Brown", 1, null),
("Laura", "Irene", 2, 1),
("Jessie","James", 3, 2),
("Bob", "Jackson", 3, 2),
("Susie", "Raincloud", 4, 1),
("Jamal","Jordan", 5, 4),
("Jacob", "Bornstien", 6, 1),
("Patty", "Chin", 7, 6),
("Besty", "Taylor", 7, 6),
("Penny", "Many", 8, 1);