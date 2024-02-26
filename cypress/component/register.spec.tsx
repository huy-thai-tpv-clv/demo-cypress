import React from 'react';
import Page from '@/app/(authentication)/register/page';

describe('1111', () => {
  it('should render the component', () => {
    cy.mount(<Page />);
    cy.get('form').should('be.visible');
    cy.screenshot();
  });
});
