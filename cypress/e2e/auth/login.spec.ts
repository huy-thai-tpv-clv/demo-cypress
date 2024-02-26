describe('Login Suite', () => {
  beforeEach(() => {
    cy.fixture('users').as('usersData');
  });

  it('should log in with valid credentials', function () {
    const { validUser } = this.usersData;

    // Perform login
    cy.loginViaUser(validUser);

    // Assertion: Check if the login is successful
    cy.url().should('include', '/pokemons'); // Adjust the URL accordingly
  });

  it('should not log in with invalid email', function () {
    // cy.intercept("POST", "/api/auth/login", {
    //   statusCode: 200,
    //   body: {
    //     token: "mocked-token",
    //   },
    // }).as("loginStub");
    const { invalidUserEmail } = this.usersData;

    // Perform login
    cy.loginViaUser(invalidUserEmail);

    // Check toast show
    cy.get("[role='alert']").should('be.visible');
    cy.get("[role='alert']").contains(
      'Invalid username or password.Please try again'
    );
  });
});
