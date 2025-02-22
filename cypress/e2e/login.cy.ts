/// <reference types="cypress" />

describe("Authentication flow", () => {
  it("Should successfully log in an existing user", () => {
    cy.visit("http://localhost:3000/login");

    // fill out the login form
    cy.get('input[name="email"]').type("yaredyilma11@gmail.com");
    cy.get('input[name="password"]').type("Test1234@");

    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");

    cy.contains("Next Starter Template").should("be.visible");
  });
});
