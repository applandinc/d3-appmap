context('Component Diagram', () => {
  beforeEach(() => {
    cy.visit('http://localhost:10001');
  });

  it('renders', () => {
    cy.get('.appmap__component-diagram .output')
      .children('.nodes')
      .should('contain', 'app/controllers');
  });

  it('does not expand too many nodes', () => {
    cy.get('.nodes g.node').should('have.length', 12);
  });

  it('node "Digest::Instance" should be expanded', () => {
    cy.get('.nodes .node.package[data-id="openssl"]').should('not.exist');
    cy.get('.nodes .node.class[data-id="Digest::Instance"]').should('exist');
  });

  it('package "app/controllers" should be expanded and have border', () => {
    cy.get('.node.package[data-id="app/controllers"]').rightclick();

    cy.get('a.dropdown-item').contains('Expand').click();
    cy.get('.clusters .cluster[data-id="app/controllers-cluster"]').should(
      'have.class',
      'cluster--bordered',
    );
  });

  it('node "SQL" can be highlighted', () => {
    cy.get('.nodes .node[data-id="SQL"]')
      .click()
      .should('have.class', 'highlight');
  });

  it('node "SQL" can be focused', () => {
    cy.get('.nodes .node[data-id="SQL"]')
      .dblclick()
      .should('have.class', 'highlight');

    cy.get('.nodes .node.package[data-id="json"]').should('have.class', 'dim');
    cy.get('.edgePaths .edgePath.dim').should('have.length', 19);
  });

  it('nothing is highlighted by default', () => {
    cy.get('.nodes .node.highlight').should('not.exist');
  });
});
