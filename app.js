const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const membersOfTeam = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function createManager() {
    inquirer
        .prompt([{
                type: "input",
                name: "name",
                message: "enter name please",
               
            },
            {
                type: "input",
                name: "id",
                message: "enter id please",
               
            },
            {
                type: "input",
                name: "email",
                message: "enter your email addrress.",
               
            },
            {
                type: "input",
                name: "office",
                message: "enter your office number please.",
               
            },
        ]).then(function (answers) {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
            membersOfTeam.push(manager);
            addTOTEAM();

        })
}

function createEngineer() {
    inquirer
        .prompt([{

                type: "input",
                name: "name",
                message: "engineer name",

            },
            {
                type: "input",
                name: "id",
                message: "engineer id please"
            },
            {
                type: "input",
                name: "email",
                message: "engineer email address please",
            },
            {
                type: "input",
                name: "github",
                message: "enter engineers git hub username.",

            },

        ]).then(function (answersEng) {
            const engineer = new Engineer(answersEng.name, answersEng.id, answersEng.email, answersEng.github);
            membersOfTeam.push(engineer);
            addTOTEAM();

        })
}

function createIntern() {
    inquirer
        .prompt([{
                type: "input",
                name: "name",
                message: "intern name please",

            },
            {
                type: "input",
                name: "id",
                message: "intern id please"
            },
            {
                type: "input",
                name: "email",
                message: "intern email please",
            },
            {
                type: "input",
                name: "school",
                message: "school intern attended",

            },

        ]).then(function (answersInt) {
            const intern = new Intern(answersInt.name, answersInt.id, answersInt.email, answersInt.school);
            membersOfTeam.push(intern);
            addTOTEAM();
        })
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
function addTOTEAM() {
    inquirer
        .prompt([{
            type: "list",
            name: "employeeType",
            message: "what kind of team member will you be adding?",
            choices: [
                "Engineer",
                "intern",
                "not adding new team member."
            ]
        }]).then(function (answer) {
            if (answer.employeeType === "Engineer") {
                createEngineer();
            } else if (answer.employeeType === "intern") {
                createIntern();
            } else {
                console.log("we created your team!")
                makeTeam();
            }
        })
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
function makeTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(membersOfTeam), "utf-8");
}
createManager();
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```