# HomeworkTaskQAIntership
This project contains automated end-to-end tests using Cypress for magento.softwaretestingboard.com website.
Prerequisites

    Node.js (v12.0.0 or higher)
    npm (v6.0.0 or higher)

All credits to the Node.js team.
https://nodejs.org/en/ 
Follow guide for prerequisites installation, opt-in for npm: 
        https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
Installation 

  Clone the repository to your local machine, open the powershell terminal and type:

    git clone https://github.com/KarolisGl/HomeworkTaskQAIntership.git

Navigate to the project directory:

    cd HomeworkTaskQAIntership

Install the project dependencies:

    npm install

Running Tests
To open the Cypress Test Runner from the terminal:

    npx cypress open

This command will open the Cypress Test Runner where you can select and run individual tests.

Little Tutorial on how to use the 'headful' cypress after running npx cypress open.
        
        Go into E2E testing, that shows "configured". 
        Select Chrome or Electron.
        Select Technical-QA-Interview-Task.cy.js spec.
        All the tests should run automatically
        And you can enjoy the light-show of going across/reloading a dozen pages per 15-35 seconds!

To run all tests in headless mode:

    npx cypress run

This command will run all tests in the terminal.
There is an additional library added: "cypress-real-events" all credits to: https://github.com/dmtrKovalenko/cypress-real-events, https://github.com/dmtrKovalenko.
Test Structure

    cypress/e2e: Contains end-to-end tests.
    cypress/fixtures: Contains test data in JSON format.
    cypress/support: Contains custom commands and reusable utilities.
