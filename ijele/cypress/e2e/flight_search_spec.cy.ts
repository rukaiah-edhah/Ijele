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
    cy.wait('@getLocationSuggestions').its('response.statusCode').should('eq', 200);
    cy.get('div').contains('New York').click();

    // Simulate user input for destination city
    cy.get('input[placeholder="Search Destination City..."]').type('Par');
    cy.wait('@getLocationSuggestions').its('response.statusCode').should('eq', 200);
    cy.get('div').contains('Paris').click();

    // Simulate user input for dates
    cy.get('input[type="date"]').first().type('2024-09-01');
    cy.get('input[type="date"]').last().type('2024-09-05');

    // Submit the search form
    cy.get('button[type="submit"]').click();

    // Wait for flight search results and verify the status
    cy.wait('@getFlightList').its('response.statusCode').should('eq', 200);

    // Verify that flight results are rendered correctly
    cy.get('.flight-list').should(($list) => {
      expect($list).to.exist;
      expect($list.find('.flight-card')).to.have.length.greaterThan(0); // Adjusted selector based on FlightCard component

      // Example: Check the first flight card
      cy.get('.flight-card').first().within(() => {
        cy.get('img').should('have.attr', 'src').and('include', '/path/to/airline-bf-logo.png');
        cy.get('.text-lg').should('contain.text', '2024-09-01T23:00:00 - 2024-09-02T12:15:00');
        cy.get('.text-sm').should('contain.text', 'Non-stop');
        cy.get('.text-lg').should('contain.text', '496.37');
        cy.get('button').should('contain.text', 'Select Flight');
      });
    });
  });
});
