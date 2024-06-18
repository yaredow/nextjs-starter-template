/// <reference types="cypress" />

// Cypress adds chai expect and assert to global
declare global {
  const expect: Chai.ExpectStatic;
  const assert: Chai.AssertStatic;
}

export {};
