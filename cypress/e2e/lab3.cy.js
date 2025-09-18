describe('Lab 3: GitHub Navigation Flow', () => {
  it('should search for cypress, navigate to repo, and use browser history', () => {
    // 1. Visit GitHub
    cy.visit('https://github.com')

    // 2. Open search bar
    cy.get('.js-nav-padding-recalculate .Button-label').click() // Click "Search GitHub" button
    cy.get('span.flex-1').click() // Focus the input field

    // 3. Type and submit search
    cy.get('[name="query-builder-test"]').type('cypress{enter}')

    // 4. Click first repository link
    cy.get('h3 a').first().click()

    // 5. Verify repository page
    cy.url().should('include', '/cypress')
    cy.get('h1').should('be.visible') // Repository title
    cy.contains('About').should('be.visible') // Confirms repo page loaded

    // 6. Go back to search results
    cy.go('back')

    // 7. Verify back on search page
    cy.url().should('include', 'search?q=cypress')
    cy.get('h3 a').should('have.length.greaterThan', 1) // Multiple results

    // 8. Go forward to repo and verify again
    cy.go('forward')
    cy.get('h1').should('be.visible')
    cy.contains('About').should('be.visible')

    // 9. Final confirmation (optional)
cy.log('✅ Test completed successfully')
  })
})