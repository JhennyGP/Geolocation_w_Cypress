import data from '../fixtures/orphanages.json'

describe('Cadastro de Orfanatos', () => {
  it('Deve cadastrar um novo orfanato', () => {
    cy.visit('http://localhost:3000/orphanages/create/')

    const orphanage = data.create
    
    cy.get('legend')
      .should('be.visible')
      .should('have.text', 'Cadastro')

      // option with id
      // cy.get('#name')
      //   .type('Orfanato Crianca Feliz')

      // option with label
      // cy.get('label', 'Nome')
      // .parent()
      // .find('input').type('Orfanato Crianca Feliz')

      cy.get('input[name=name]')
      .type(orphanage.name)

      // cy.get('#description').type('Descricao do Orfanato')

      // cy.get('#opening_hours').type('Das 8h as 17h')

      cy.get('#description').type(orphanage.description)

      // force true will force the cypress to take an element that is not visible.
      cy.get('input[type=file]')
        .selectFile('cypress/fixtures/images/kids-playground-1.png', {force: true})

      cy.get('#opening_hours').type(orphanage.opening_hours)

      cy.contains('button', 'Sim').click

      // dot before a .class name
      cy.get('.save-button').click()
  })
})










// mockando uma localizacao
Cypress.Commands.add('visitWithMockGeolocation', (url, latitude = -23.970632, longitude = -46.362388) => {
  const mockGeolocation = (win, latitude, longitude) => {
    cy.stub(win.navigator.geolocation, 'getCurrentPosition', (cb) => {
      return cb({ coords: { latitude, longitude } });
    });
  };

  const onBeforeLoad = (win) => {
    mockGeolocation(win, latitude, longitude);
  };

  cy.visit(url, { onBeforeLoad });
});
