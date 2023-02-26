const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.
const employees = [];
// Pseudo code from Dan Mueller (instructor) from class

inquirer.prompt([
    //manager questions
    {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name?",
    },
    {
        type: 'number',
        name: 'id',
        message: "What is the team manager's id?",
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the team manager's email?",
    },
    {
        type: 'number',
        name: 'officeNumber',
        message: "What is the team manager's office number?",
    },
]).then(response => {
    console.log('This is the response:')
    console.log(response);
    // populate manager info
    employees.push(new Manager(response.name, response.id, response.email, response.officeNumber));
    console.log('This is the employees object:')
    console.log(employees);
    employees.push(new Manager("Bib",1,"bib@gmail.com",11));
    console.log(employees);
})