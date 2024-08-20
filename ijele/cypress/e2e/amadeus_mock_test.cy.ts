describe('Ijele App - Mock Amadeus API', () => {
  // This block runs before each test in this describe block
  beforeEach(() => {
    // Intercept the API call and mock the response
    cy.intercept('GET', 'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city', {
      statusCode: 200,
      body: { 
        // Replace with your mock data structure
        data: [
          {
            id: 'hotel1',
            name: 'Mock Hotel 1',
            location: 'Mock Location 1',
            price: '$100',
          },
          {
            id: 'hotel2',
            name: 'Mock Hotel 2',
            location: 'Mock Location 2',
            price: '$150',
          },
        ],
      },
    }).as('getAmadeusData'); // Alias the interception for easier reference in tests
  });

  it('should display mocked data from the Amadeus API', () => {
    // Visit the page that makes the API call
    cy.visit('/your-page-route'); // Replace with the actual route in your app

    // Wait for the API call to complete and check if it was intercepted
    cy.wait('@getAmadeusData'); // Ensure the mock data is used

    // Add assertions to verify the UI displays the mocked data
    cy.get('[data-cy="hotel-name"]') // Replace with your actual selector
      .should('contain', 'Mock Hotel 1');
    cy.get('[data-cy="hotel-name"]')
      .should('contain', 'Mock Hotel 2');
  });
});