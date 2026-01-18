describe('Article Flow', () => {
  const timestamp = Date.now();

  const user = {
    username: `Vika${timestamp}`,
    email: `vika${timestamp}@test.com`,
    password: 'Password123!'
  };

  const article = {
    title: `JavaScript ${timestamp}`,
    description: `Test Description ${timestamp}`,
    body: `Test Body ${timestamp}`
  };

  before(() => {
    cy.login(user.email, user.username, user.password);
  });

  it('should create an article', () => {
    cy.createArticle(article.title, article.description, article.body);
    cy.visit('/');
    cy.contains('a.nav-link', user.username.toLowerCase()).click();
    cy.contains(article.title).should('be.visible');
  });

  it('should delete the article', () => {
    cy.contains('a.nav-link', user.username.toLowerCase()).click();
    cy.contains(article.title).click();

    cy.contains('.btn.btn-outline-danger.btn-sm', 'Delete Article').click();
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Do you really want to delete it?');
      return true;
    });

    cy.contains(article.title).should('not.exist');
  });
});
