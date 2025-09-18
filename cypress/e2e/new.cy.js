describe('Login Test', () => {
  it('should log in successfully', () => {
    cy.login(); // Uses default credentials
    cy.url().should('include', '/inventory.html'); // Assert successful login
  });
});
