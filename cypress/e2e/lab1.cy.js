describe('Lab 1: Wikipedia History Navigation & Viewport Test', () => {
  it('should navigate through history and test mobile viewport', () => {
    // 1. Visit the main page — NO extra spaces
    cy.visit('https://www.wikipedia.org/')

    // 2. Navigate to English Wikipedia — ensure visible before clicking
    cy.get('#js-link-box-en').should('be.visible').click()

    // 3-6: All interactions on en.wikipedia.org must be inside cy.origin() — NO spaces
    cy.origin('https://en.wikipedia.org', () => {
      // Wait for featured article section to load
      cy.get('#mp-tfa').should('be.visible')

      // ✅ Find the correct article link (not the image)
      // Look for an <a> tag with text like "Gateshead International Stadium" or similar
      cy.get('#mp-tfa a')
        .filter((_, el) => {
          const text = el.textContent.trim()
          return text.includes('Gateshead') || text.includes('Stadium') || text.length > 10
        })
        .first()
        .click()

      // 4. Go back and assert URL
      cy.go('back')
      cy.url().should('include', 'Main_Page')

      // 5. Set mobile viewport
      cy.viewport('iphone-x')

      // 6. Go forward and assert heading is visible
      cy.go('forward')

      // Optional: Small wait to ensure page settles
      cy.wait(500)

      // Assert the article heading is visible
      cy.get('#firstHeading').should('be.visible')
    })
  })
})