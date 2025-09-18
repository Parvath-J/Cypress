describe('OrangeHRM Login', () => {
 it('should login with custom command', () => {
 cy.login2('Admin', 'admin123')
 cy.url().should('include', '/dashboard')
 })
})