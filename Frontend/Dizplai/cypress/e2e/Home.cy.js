describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/polls/allPolls', {
      statusCode: 200,
      body: [
        {
          id: 1,
          question: 'What is your favorite color?',
          options: ['Red', 'Blue', 'Green']
        }
      ]
    }).as('getPolls');

    cy.intercept('GET', '/polls/1/votes', {
      statusCode: 200,
      body: [
        { pollId: 1, optionIndex: 0 },
        { pollId: 1, optionIndex: 0 },
        { pollId: 1, optionIndex: 0 },
        { pollId: 1, optionIndex: 1 },
        { pollId: 1, optionIndex: 2 },
        { pollId: 1, optionIndex: 2 }
      ]
    }).as('getVotes');

    cy.intercept('POST', 'http://localhost:8080/polls/1/vote?optionIndex=0', {
      statusCode: 200
    }).as('castVote');

    cy.visit('http://localhost:3000/Home');
    cy.wait('@getPolls');
  });

  it('Displays question and options', () => {
    cy.contains('What is your favorite color?').should('be.visible');
    cy.contains('Red').should('be.visible');
    cy.contains('Blue').should('be.visible');
    cy.contains('Green').should('be.visible');
  });

  it('User able to pick an option and shows vote percentage', () => {
    cy.contains('Red').click();
    cy.wait('@castVote');
    cy.wait('@getVotes');
    cy.get('[data-testid="Percentage-Bar"]').should('have.length', 3);
  });

  it('Navigates to Create Poll Page', () => {
    cy.contains('Create Polls').should('be.visible');
    cy.contains('Create Polls').click();
    cy.url().should('include', '/CreatePolls');
  });
});
