describe('Ijele App - Mock Amadeus API', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/location-search*', {
      fixture: 'locationSuggestions.json'
    }).as('getLocationSuggestions');

    cy.intercept('GET', '**/api/hotels/list*', {
      fixture: 'hotelListResults.json'
    }).as('getHotelList');

    cy.visit('/Hotel');
  });

  it('should display location suggestions and then show mocked hotels data after selection', () => {
    cy.get('input[placeholder="Search City..."]').type('New');
    cy.wait('@getLocationSuggestions').its('response.statusCode').should('eq', 200);
    cy.get('div').contains('New York').click();

    cy.get('input[type="date"]').first().type('2024-09-01');
    cy.get('input[type="date"]').last().type('2024-09-05');

    cy.wait(1000); 
    cy.get('div.flex.justify-center.items-center.space-x-4 button').click();

    cy.wait('@getHotelList').its('response.statusCode').should('eq', 200);
  });
});
