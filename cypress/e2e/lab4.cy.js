describe('Lab 4: The Internet - Login Form Validation', () => {
  beforeEach(() => {
    // 1. Visit the login page
    cy.visit('https://the-internet.herokuapp.com/login')
  })

  it('should verify form elements exist and are visible', () => {
    // 2. Verify elements exist and are visible
    cy.get('#username').should('exist').and('be.visible')
    cy.get('#password').should('exist').and('be.visible')
    cy.get('[type="submit"]').should('exist').and('be.visible')
  })

  it('should show error message for invalid login', () => {
    // 3. Perform invalid login
    cy.get('#username').type('invalidUser')
    cy.get('#password').type('invalidPass!')
    cy.get('[type="submit"]').click()

    // 4. Check error message
    cy.get('#flash')
      .should('exist')
      .and('be.visible')
      .and('include.text', 'Your username is invalid!')
  })

  it('should show success message for valid login', () => {
    // 5. Perform valid login
    cy.get('#username').clear().type('tomsmith')
    cy.get('#password').clear().type('SuperSecretPassword!')
    cy.get('[type="submit"]').click()

    // 6. Check success message
    cy.get('#flash')
      .should('exist')
      .and('be.visible')
      .and('include.text', 'You logged into a secure area!')
  })
})