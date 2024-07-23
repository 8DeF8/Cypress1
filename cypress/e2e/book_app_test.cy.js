describe('BookApp Test', () => {
  beforeEach(() => {
    cy.visit("/")
  });

  it("Authorization", () => {
    cy.login("bropet@mail.ru", 123);
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("Password only", () => {
    cy.contains("Log in").click();
    cy.get("#mail").type(" ");
    cy.get("#pass").type("123");
    cy.contains("Submit").click();
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("Email only", () => {
    cy.contains("Log in").click();
    cy.get("#mail").type("bropet@mail.ru");
    cy.contains("Submit").click();
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
})