# Dizplai
Dizplai Tech Test

This Project is broken down to 2 subfolders 

Dizplai
  - Frontend - http://localhost:3000/Home
  - Backend - http://localhost:8080/swagger-ui/index.html#/

To run the frontend 
- First do a npm i to install packages
- Then to run in development mode run: npm run start
- To Run Cypress Tests: npx cypress open
  Then it will open a window select e2e testing and select chrome then start e2e testing This will then open a new chrome window and now select the Home.cy.js

To run the backend
- First run: mvn clean install
- Then to run the application: mvn spring-boot:run
- To run the unit test run the following: mvn run test

  Swagger Endpoint - http://localhost:8080/swagger-ui/index.html#/
