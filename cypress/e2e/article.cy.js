/* eslint-disable max-len */
const user = {
  username: 'Vikam',
  email: 'vika1@test.com',
  password: 'vika'
};

describe('Create the article', () => {
  before(() => {
    cy.visit('/');

    cy.contains('a.nav-link', 'Sign in').click();
    cy.get('[type=email]').type(user.email);
    cy.get('[type=password]').type(user.password);
    cy.get('.btn-lg').click();
  });

  it('should create an article', () => {
    cy.contains('a.nav-link', 'New Article').click();

    cy.get('[placeholder="Article Title"]').type('JavaScript');
    // eslint-disable-next-line quotes
    cy.get(':nth-child(2) > .form-control').type('JavaScript');
    cy.get('textarea.form-control').type('JavaScript');
    cy.get('[placeholder="Enter tags"]').type('laguage');
    cy.get('.btn-lg').click();
    cy.get('.btn-lg').click();
    cy.contains('h1', 'JavaScript').should('be.visible');
  });
});

describe('Delete the article', () => {
  before(() => {
    cy.visit('/');

    cy.contains('a.nav-link', 'Sign in').click();
    cy.get('[type=email]').type(user.email);
    cy.get('[type=password]').type(user.password);
    cy.get('.btn-lg').click();
  });

  it('should delete an article', () => {
    cy.contains('a.nav-link', user.username.toLowerCase()).click();
    cy.get(':nth-child(2) > .preview-link').click();
    cy.contains('.btn.btn-outline-danger.btn-sm', 'Delete Article').click();

    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you really want to delete it?');
      return true;
    });

    cy.contains('.navbar-brand', 'conduit');
  });
});
