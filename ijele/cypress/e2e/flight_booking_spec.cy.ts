describe('Flight Booking Functionality', () => {
    beforeEach(() => {
      cy.intercept('POST', '/api/flight-booking', { fixture: 'flightBookingDetails.json' }).as('postFlightBooking');
      cy.visit('http://localhost:3000/v1/booking/flight-orders'); // Adjust the URL based on your app's routing
    });
  
    it('should complete a flight booking successfully', () => {
      cy.get('input[name="flightNumber"]').type('12345');
      cy.get('input[name="travelerName"]').type('John Doe');
      cy.get('input[name="travelerEmail"]').type('john.doe@example.com');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@postFlightBooking');
  
      cy.get('.booking-confirmation').should('be.visible').and('contain', 'Booking Confirmed');
      cy.get('.booking-details').should('contain', 'Flight Number: 12345');
      cy.get('.booking-details').should('contain', 'Traveler Name: John Doe');
    });
  
    it('should handle booking errors gracefully', () => {
      cy.intercept('POST', '/api/flight-booking', { statusCode: 400, body: { error: 'Booking failed' } }).as('postFlightBookingError');
      cy.get('input[name="flightNumber"]').type('12345');
      cy.get('input[name="travelerName"]').type('John Doe');
      cy.get('input[name="travelerEmail"]').type('john.doe@example.com');
      cy.get('button[type="submit"]').click();
  
      cy.wait('@postFlightBookingError');
  
      cy.get('.error-message').should('be.visible').and('contain', 'Booking failed');
    });
  });
  