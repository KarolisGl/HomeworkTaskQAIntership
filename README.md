# HomeworkTaskQAIntership
This project contains automated end-to-end tests using Cypress for magento.softwaretestingboard.com website.
Prerequisites

    Node.js (v12.0.0 or higher)
    npm (v6.0.0 or higher)

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

To run all tests in headless mode:

    npx cypress run

This command will run all tests in the terminal.
Test Structure

    cypress/e2e: Contains end-to-end tests.
    cypress/fixtures: Contains test data in JSON format.
    cypress/support: Contains custom commands and reusable utilities.
