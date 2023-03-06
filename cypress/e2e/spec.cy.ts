describe('template spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/profile');
    cy.wait(2000); // wait for the element to load
    cy.get('[class*="input_type_email"]').type('grandmix.ru@gmail.com');
    cy.get('[class*="input_type_password"]').type('Qwerty123');
    cy.get('[class*="loginButton"]').click()
    cy.visit('http://localhost:3000');
    cy.wait(2000); // wait for the element to load
  });
  
  it("should move ingredient to the constructor and check it's presence there", () => {
    const source = cy.get('#buns');
    const sourceFirstChild = source.find('a').first();
    const target = cy.get('div[class*="burger-constructor_container"]');
    const bunText = sourceFirstChild.find('p[class*="burger-ingredients-item_description"]');
    
    sourceFirstChild.trigger('dragstart');
    target.trigger('drop');
    sourceFirstChild.trigger('dragend');

    bunText.invoke('text').then((text) => {
      // Log the extracted text
      target.contains(text).should('be.visible');
    });
  })
  it("should open the ingredient detail, check data, and close it", () => {
    const source = cy.get('#buns');
    const sourceFirstChild = source.find('a').first().click();
    const bunText = sourceFirstChild.find('p[class*="burger-ingredients-item_description"]');
    const target = cy.get('[class*="modalContent"]');
    const targetCloseIcon = cy.get('[class*="closeIcon"]');

    bunText.invoke('text').then((text) => {
      // Log the extracted text
      target.contains(text).should('be.visible');
      targetCloseIcon.click();
      target.get('[class*="modalContent"]').should('not.exist');
    })
  });
})