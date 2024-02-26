import { v4 } from 'uuid';

describe('Register Suite', () => {
  beforeEach(() => {
    cy.fixture('users').as('usersData');
  });

  it('should login success after register successfull', function () {
    const username = `user_${v4()}`;
    const email = `${username}@gmail.com`;

    cy.registerViaUser({
      email,
      username,
      password: 'P4ssW0rd!',
      confirmPassword: 'P4ssW0rd!',
    });

    cy.url().should('include', '/login');

    cy.loginViaUser({
      email,
      password: 'P4ssW0rd!',
    });
    cy.url().should('include', '/pokemons');
  });
});
