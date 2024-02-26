import React from 'react';
import LoginPage from '@/components/Login';

describe('1111', () => {
  it('should render the component', () => {
    cy.mount(<LoginPage />);
    cy.get('form').should('be.visible');
    cy.screenshot();
  });
});
