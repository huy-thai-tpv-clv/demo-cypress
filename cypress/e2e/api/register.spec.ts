import { v4 } from 'uuid';

describe('API Register Suite', () => {
  let user = {};
  beforeEach(() => {
    user = cy.fixture('register-user').as('usersData');
  });

  it.only('should register with correct user information', function () {
    cy.intercept('POST', '/api/mock/register', {
      statusCode: 200,
      body: {
        userData: 'mocked-user',
      },
    }).as('stub');

    const username = `user_${v4()}`;
    const email = `${username}@example.com`;

    // Perform register
    cy.registerViaUser({
      password: 'P4ssW0rd!',
      email,
      username,
      confirmPassword: 'P4ssW0rd!',
    });

    cy.url().should('include', '/login');
  });

});
