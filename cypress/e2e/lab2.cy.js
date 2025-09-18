describe('Lab 2: Quote Scraper Reload Test', () => {
  it('should reload page and verify title remains the same', () => {
    // 1. Visit the website
    cy.visit('https://quotes.toscrape.com/')

    // 2. Get and store the first quote text
    cy.get('.quote:first-child .text')
      .invoke('text')
      .then((firstQuoteText) => {
        // 3. Reload the page
        cy.reload()

        // 4. Verify the first quote is still the same
        cy.get('.quote:first-child .text').should('have.text', firstQuoteText)
      })
  })
})