describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/ogc-service');

    // Upload a geojson file
    cy.get('[data-cy=geojson-dropzone]').selectFile('cypress/files/exampleAreaOfInterestFile.geojson', {
      action: 'drag-drop'
    });

    // Click the continue button
    cy.get('[data-cy=continue-button]').click();

    // Select a layer
    cy.mantineSelect('[data-cy=layer-select]', 'NDVI');

    // Select a date range
    cy.mantineDateRange('[data-cy=date-range]');

    // Select a slider value
    cy.mantineSlider('[data-cy=cloud-cover-slider]');

    // Click the search button
    cy.get('[data-cy=search-flyovers-button]').click();

    // Select a flyover
    cy.get('[data-cy=select-flyover-button]').first().click();

    // Change image format to JPEG
    cy.mantineSelect('[data-cy=image-format-select]', 'JPEG');

    // Click the get image button
    cy.get('[data-cy=download-image-button]').click();

    // Click the download button
    cy.get('[data-cy=download-image-link]').click();
  })
})