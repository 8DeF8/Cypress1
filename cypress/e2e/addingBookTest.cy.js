const firstBook = {
    title: "Призраки",
    description: "Роман рассказывает о группе из 17 человек, которая приняла заманчивое предложение на три месяца отрешиться от мирской суеты и создать шедевры, а попала в ад!",
    author: "Чак Палланик",
};

const secondBook = {
    title: "Три товарища",
    description: "Три товарища в послевоенное время пытаются выжить",
    author: "Эрих Мария Ремарк",
};

const thirdBook = {
    title: "Консуэло",
    description: "Молодая девушка выбирает между любовью и музыкой",
    author: "Жорж Санд",
};

describe("Adding book test", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.login("bropet@mail.ru", 123);
    });

    it("Adding new book", () => {
        cy.addBook(firstBook);
        cy.get(".card-title").should("contain.text", firstBook.title);
      });

    it("Should add book to favorite through 'Book list' page", () => {
        cy.addBookNoFavorite(firstBook);
        cy.contains(firstBook.title)
          .should("be.visible")
          .within(() => cy.get(".card-footer > .btn").click({ force: true }));
        cy.visit("/favorites");
        cy.contains(firstBook.title).should("be.visible");
      });

    it("Adding book favorite", () => {
        cy.addFavoriteBook(secondBook);
        cy.visit("/favorites");
        cy.get(".card-title").should("contain.text", secondBook.title);
    });

    it("Delete book from favorite", () => {
        cy.visit("/favorites");
        cy.contains(secondBook.title)
          .should("be.visible")
          .within(() => cy.get(".card-footer > .btn").click({ force: true }));
        cy.contains(secondBook.title).should("not.exist");
      });
})