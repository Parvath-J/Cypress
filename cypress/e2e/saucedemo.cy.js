describe('SauceDemo Test Suite', () => {
  // 🔧 HOOKS
  before(() => {
    cy.log('🔧 Setting up test environment');
  });

  beforeEach(() => {
    cy.log('🌐 Visiting login page');
    cy.visit('https://www.saucedemo.com/');
  });

  afterEach(() => {
    cy.log('🧹 Cleaning up after test');
  });

  after(() => {
    cy.log('✅ All tests completed');
  });

  // 🛠️ CORE COMMANDS
  it('should log in using core commands', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');
  });

  // ✅ POSITIVE ASSERTIONS
  it('should display product list after login', () => {
    cy.login();
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
    cy.get('.inventory_item_name').first().should('contain', 'Sauce');
  });

  // ❌ NEGATIVE ASSERTIONS
  it('should show error for locked out user', () => {
    cy.login('locked_out_user', 'secret_sauce');
    cy.get('[data-test="error"]').should('exist').and('contain', 'locked out');
  });

  it('should not show inventory page for invalid login', () => {
    cy.login('invalid_user', 'wrong_password');
    cy.url().should('not.include', '/inventory.html');
    cy.get('.inventory_list').should('not.exist');
  });

  it('should not show error message before login attempt', () => {
    cy.get('[data-test="error"]').should('not.exist');
  });

  // ⏱️ IMPLICIT WAITS
  it('should wait for product list to load implicitly', () => {
    cy.login();
    cy.get('.inventory_list').find('.inventory_item').should('have.length.at.least', 6);
  });

  // ⏳ EXPLICIT WAITS
  it('should wait for network request explicitly', () => {
    cy.intercept('GET', '**/inventory_item').as('getInventory');
    cy.login();
    cy.wait('@getInventory');
    cy.get('.inventory_item').should('be.visible');
  });

  // 🌐 URL & WINDOW ASSERTIONS
  it('should assert on URL and window properties', () => {
    cy.login();
    cy.url().should('include', '/inventory.html');
    cy.window().should('have.property', 'localStorage');
  });

  // 🔗 CHAINED ASSERTIONS
  it('should verify cart button is visible and clickable', () => {
    cy.login();
    cy.get('.shopping_cart_link')
      .should('be.visible')
      .and('not.have.class', 'disabled')
      .click();
  });
});
