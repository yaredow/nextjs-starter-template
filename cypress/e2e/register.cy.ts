/// <reference types="cypress" />

describe("Authentication flow", () => {
  it("should sign up a new user", () => {
    cy.visit("http://localhost:3000/register");

    // fill out the signup form
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type(`testuser_${Date.now()}@example.com`);
    cy.get('input[name="password"]').type("TestPassword123");

    //submit the form
    cy.get('button[type="submit"]').click();

    // assert that signup was successful
    cy.url().should("include", "/");
    cy.contains("Next Starter Template").should("be.visible");
  });
});
