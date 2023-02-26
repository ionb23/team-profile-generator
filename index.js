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
    console.log(response);
    // populate manager info
    employees.push(new Manager(response.name, response.id, response.email, response.officeNumber));
    promptForNextEmployee();
})

const promptForNextEmployee = () => {
    inquirer.prompt([
        // choice of 3
        {
            type: 'list',
            name: 'newTeamMemberType',
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members",
            ],
        },
    ]).then(response => {
        // if engineer
        //    promptForEngineer
        // else if intern
        //    promptForIntern
        // else
        //    use the functionality from page-template to generate the team
        // console.log(response.newTeamMemberType);
        if (response.newTeamMemberType === 'Engineer') {
            console.log(response.newTeamMemberType);
            promptForEngineer();
        } else if (response.newTeamMemberType === 'Intern') {
            console.log(response.newTeamMemberType);
            promptForIntern();
        } else {
            console.log(response.newTeamMemberType);
            buildPage();
        }
    })
}

const promptForEngineer = () => {
    inquirer.prompt([
        //engineer questions
        {
            type: 'input',
            name: 'name',
            message: "What is your engineer's name?",
        },
        {
            type: 'number',
            name: 'id',
            message: "What is your engineer's id?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your engineer's email?",
        },
        {
            type: 'input',
            name: 'github',
            message: "What is your engineer's Github username?",
        },
    ]).then(response => {
        // add new engineer to employees array
        employees.push(new Engineer(response.name, response.id, response.email, response.github));
        promptForNextEmployee();
    })
}

const promptForIntern = () => {
    inquirer.prompt([
        //intern questions
        {
            type: 'input',
            name: 'name',
            message: "What is your intern's name?",
        },
        {
            type: 'number',
            name: 'id',
            message: "What is your intern's id?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your intern's email?",
        },
        {
            type: 'input',
            name: 'school',
            message: "What is your intern's school?",
        },
    ]).then(response => {
        // add new intern to employees array
        employees.push(new Intern(response.name, response.id, response.email, response.school));
        promptForNextEmployee();
    })
}

const buildPage = () => {
    console.log(employees);
    // console.log(render(employees));
    fs.writeFile('team.html', render(employees), (error) =>
        error ? console.log(error) : console.log("You have successfully generated a new team.html file with the given information!")
    );

    // const testArray = [];
    // testArray.push(new Manager ("Dan",1,"manager@gmail.com",17));
    // testArray.push(new Employee ("Den",2,"employee@gmail.com"));
    // testArray.push(new Engineer ("Don",3,"engineer@gmail.com","myGithubhehe"));
    // testArray.push(new Intern ("Dan",4,"intern@gmail.com","scholhihi"));
    // console.log(render(testArray));

}

// buildPage();