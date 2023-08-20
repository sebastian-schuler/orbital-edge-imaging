/// <reference types="cypress" />
// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Selects an option from a Mantine select component.
 */
Cypress.Commands.add('mantineSelect', (selectSelector, value) => {
    cy.get(selectSelector).scrollIntoView();
    cy.get(selectSelector).click({ force: true });

    const options = () => cy.get(selectSelector)
        .parents(".mantine-Select-root")
        .find('.mantine-Select-dropdown .mantine-Select-item');

    if (typeof value === "string") {
        // If the given value is a string, select the option with that label
        return options().contains(value, { matchCase: false }).click({ force: true });
    } else if (typeof value === "number") {
        // Else if it's a number, select the option at that index
        return options().eq(value).click({ force: true });
    } else {
        throw new Error(`value should be a string or number, but was '${value}' (${typeof value}).`);
    }
});

/**
 * Selects a date range from a Mantine date range component.
 */
Cypress.Commands.add('mantineDateRange', (selectSelector) => {
    cy.get(selectSelector).scrollIntoView();
    cy.get(selectSelector).click({ force: true });

    cy.get(selectSelector)
        .parents(".mantine-DatePickerInput-root")
        .find('button[data-previous=true]')
        .click({ force: true });

    const calendar = () => cy.get(selectSelector)
        .parents(".mantine-DatePickerInput-root")
        .find('.mantine-DatePickerInput-monthTbody');


    calendar().children().find('button').contains('1').click({ force: true });
    calendar().children().find('button').contains('15').click({ force: true });
});

/**
 * Selects a value from a Mantine slider component.
 */
Cypress.Commands.add('mantineSlider', (selectSelector) => {
    cy.get(selectSelector).scrollIntoView();
    cy.get(selectSelector).click({ force: true });

    cy.get(selectSelector)
        .find('[role=slider]')
        .click({ force: true });

    cy.get(selectSelector)
        .find('[role=slider]')
        .type(
            "{leftarrow}".repeat(50)
        );

});

declare namespace Cypress {
    interface Chainable {
        mantineSelect(selectSelector: string, value: string): Chainable<JQuery<HTMLElement>>
        mantineDateRange(selectSelector: string): Chainable<void>
        mantineSlider(selectSelector: string): Chainable<void>
    }
}

// ============================================================
// Helper functions
// ============================================================

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNonEqualRandomNumbers(min: number, max: number): [number, number] {
    const firstNumber = getRandomInt(min, max);
    let secondNumber = getRandomInt(min, max);

    while (secondNumber === firstNumber) {
        secondNumber = getRandomInt(min, max);
    }

    return [firstNumber, secondNumber];
}

