describe('Flight Search Functionality', () => {
  beforeEach(() => {
    // Mock API responses
    cy.intercept('GET', '**/api/location-search*', {
      fixture: 'flightLocationSuggestions.json'
    }).as('getLocationSuggestions');

    cy.intercept('GET', '**/api/flights/search*', {
      fixture: 'flightSearchResults.json'
    }).as('getFlightList');

    // Visit the Flight page
    cy.visit('/Flight');
  });

  it('should display location suggestions and then show mocked flight data after selection', () => {
    // Simulate user input for origin city
    cy.get('input[placeholder="Search Origin City..."]').type('New');
    cy.wait('@getLocationSuggestions', { timeout: 10000 }) // Increase the timeout to 10 seconds
      .its('response.statusCode').should('eq', 200);
    cy.get('div').contains('New York').click();

    // Simulate user input for destination city
    cy.get('input[placeholder="Search Destination City..."]').type('Par');
    cy.wait('@getLocationSuggestions', { timeout: 10000 }) // Increase the timeout to 10 seconds
      .its('response.statusCode').should('eq', 200);
    cy.get('div').contains('Paris').click();

    // Simulate user input for dates
    cy.get('input[type="date"]').first().type('2024-09-01');
    cy.get('input[type="date"]').last().type('2024-09-05');

    // Submit the search form
    cy.get('button[type="submit"]').click();

    // Wait for flight search results and verify the status
    cy.wait('@getFlightList', { timeout: 10000 }) // Increase the timeout to 10 seconds
      .its('response.statusCode').should('eq', 200);
  });
});
