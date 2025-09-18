describe('SauceDemo Login and UI Assertions', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
  });

  it('should login successfully and validate UI elements', () => {
    // Login
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Assert URL change
    cy.url().should('include', '/inventory.html');

    // Assert visibility of product list
    cy.get('.inventory_list').should('be.visible');

    // Assert number of products displayed
    cy.get('.inventory_item').should('have.length', 6);

    // Assert specific product name
    cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Backpack');

    // Assert Add to Cart button is visible and enabled
    cy.get('#add-to-cart-sauce-labs-backpack')
      .should('be.visible')
      .and('not.be.disabled');

    // Assert CSS class
    cy.get('.shopping_cart_link').should('have.class', 'shopping_cart_link');

    // Add to cart and assert cart badge
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
  });

  it('should show error for locked out user', () => {
    cy.get('#user-name').type('locked_out_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Assert error message
    cy.get('[data-test="error"]').should('contain.text', 'Sorry, this user has been locked out.');
  });
});
