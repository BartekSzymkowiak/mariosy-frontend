export class SentMariosesPage{

    checkSentMariosLabel(){
        cy.contains('SENT MARIOS:')
    }

    checkBackButton(){
        cy.get('.button').should('contain.text', 'BACK');
    }

    clickBackButton(){
        cy.get('.button').click();
    }

    checkMariosesCountGreaterThan(number: number){
        cy.get('app-marios-grid').find('mat-grid-tile').its('length').should('gt', number)
    }

    checkSentMariosesCount(expectedCount: Cypress.Chainable<JQuery<HTMLElement>>){
        cy.log(expectedCount)
        expectedCount.then((text) => {
            
            cy.get('app-marios-grid').find('mat-grid-tile').its('length').should('eq', parseInt(text,10))
        })
    }

}


export const sentMariosesPage = new SentMariosesPage()