import data from '../fixtures/orphanages.json'
// import { faker } from '@faker-js/faker'

describe('Cadastro de Orfanatos', () => {
  it('Deve cadastrar um novo orfanato', () => {
    cy.visit('http://localhost:3000/orphanages/create/')

    const orphanage = data.create

    cy.deleteMany({name: orphanage.name}, {collection: 'orphanages'})

    cy.get('legend')
      .should('be.visible')
      .should('have.text', 'Cadastro')

    cy.setMapPosition(orphanage.position)

    cy.get('input[name=name]')
      .type(orphanage.name)
      // .type(orphanage.name + ' ' + faker.company.name())

    cy.get('#description').type(orphanage.description)

    cy.get('input[type=file]')
      .selectFile('cypress/fixtures/images/kids-playground-1.png', { force: true })

    cy.get('#opening_hours').type(orphanage.opening_hours)

    cy.contains('button', 'Sim').click

    cy.get('.save-button').click()
  })
})


Cypress.Commands.add('setMapPosition', (position) => {
  window.localStorage.setItem("hope-qa:latitude", position.latitude);
  window.localStorage.setItem("hope-qa:longitude", position.longitude);
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
