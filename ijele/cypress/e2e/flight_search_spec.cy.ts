describe('Flight Search Functionality', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/flight-search', { fixture: 'flightSearchResults.json' }).as('getFlightSearchResults');
    cy.visit('127.0.0.1:3000/Flight'); 
  });

  it('should display flight search results correctly', () => {
    cy.get('input[type="text"]').first().type('NYC'); // Assuming this is the origin input
    cy.get('input[type="text"]').eq(1).type('PAR'); // Assuming this is the destination input
    cy.get('input[type="date"]').first().type('2024-09-01'); // Departure date
    cy.get('input[type="date"]').last().type('2024-09-07'); // Return date
    cy.get('button[type="submit"]').click();

    cy.wait('@getFlightSearchResults');

    cy.get('.flight-card').should('have.length.greaterThan', 0);
    cy.get('.flight-card').first().contains('Flight to Los Angeles');
    cy.get('.flight-card').first().contains('Departure: 2024-09-01');
  });

  it('should handle no results found', () => {
    cy.intercept('GET', '/api/flight-search', { fixture: 'flightSearchNoResults.json' }).as('getFlightSearchNoResults');
    cy.get('input[type="text"]').first().type('Unknown City'); // Origin
    cy.get('input[type="text"]').eq(1).type('Nowhere'); // Destination
    cy.get('input[type="date"]').first().type('2024-10-01'); // Departure date
    cy.get('input[type="date"]').last().type('2024-10-07'); // Return date
    cy.get('button[type="submit"]').click();

    // cy.wait('@getFlightSearchNoResults');

    cy.get('.no-results-message').should('be.visible').and('contain', 'No flights found');
  });
});
