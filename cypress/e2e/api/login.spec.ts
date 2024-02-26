describe('API Login Suite', () => {
  let user = {};
  beforeEach(() => {
    user = cy.fixture('users').as('usersData');
  });

  it('POST an valid user information', function () {
    const { validUser } = this.usersData;

    console.log('user', user);

    cy.request({
      method: 'POST',

      url: '/api/mock/login',

      body: validUser,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.token).to.be.not.empty;
    });
  });

  it('POST an invalid user information', function () {
    const { invalidUserEmail } = this.usersData;

    console.log('user', invalidUserEmail);

    cy.request({
      method: 'POST',

      url: '/api/mock/login',

      body: invalidUserEmail,
      // if handle error code need to add failOnStatusCode: false
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.body).to.eq(
        'Invalid username or password.Please try again.'
      );
    });
  });
});
