describe('TextInputComponent', () => {
  it('should display error message on blur', () => {
    cy.visit('iframe.html?id=components-inputs-textinput--form');

    cy.get('#root').get('[id="username"]').should('be.visible').click();
    cy.get('#root').get('[id="password"]').should('be.visible').click();
    cy.get('#root').get('.submit').should('be.visible').click();

    cy.get('#root')
      .get('[id="username"]')
      .shadow()
      .find('.message')
      .contains('Error: Required');

    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('.message')
      .contains('Minimum length');
  });

  it('should not display an error message when form is valid', () => {
    cy.visit('iframe.html?id=components-inputs-textinput--form');

    cy.get('#root').get('[id="username"]').shadow().find('input').type('hodor@grayskull.com');

    cy.get('#root').get('[id="password"]').shadow().find('input').type('P@ssw0rd');

    cy.get('#root').get('.submit').should('be.visible').click();

    cy.get('#root')
      .get('[id="username"]')
      .shadow()
      .find('.message')
      .should('contain.text', '');

    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('.message')
      .should('contain.text', '');
  });

  it('should display an error message when password is weak', () => {
    cy.visit('iframe.html?id=components-inputs-textinput--form');

    cy.get('#root').get('[id="username"]').shadow().find('input').type('hodor@grayskull.com');

    cy.get('#root').get('[id="password"]').shadow().find('input').type('password');
    cy.get('#root').get('.submit').click();

    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('.message')
      .contains(
        'Please use at least one uppercase letter, one lowercase letter, special character',
      );

    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('input')
      .clear()
      .click()
      .type('PASSWORD');
    cy.get('#root').get('.submit').should('be.visible').click();

    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('.message')
      .contains(
        'Please use at least one uppercase letter, one lowercase letter, special character',
      );

    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('input')
      .clear()
      .click()
      .type('12345678');
    cy.get('#root').get('.submit').should('be.visible').click();

    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('.message')
      .contains(
        'Please use at least one uppercase letter, one lowercase letter, special character',
      );

    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('input')
      .clear()
      .click()
      .type('#@#@#@#@');
    cy.get('#root').get('.submit').should('be.visible').click();

    cy.get('#root')
      .get('[id="password"]')
      .shadow()
      .find('.message')
      .contains(
        'Please use at least one uppercase letter, one lowercase letter, special character',
      );
  });
});
