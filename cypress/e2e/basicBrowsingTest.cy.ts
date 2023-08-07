/// <reference types="cypress" />

import { convertCompilerOptionsFromJson } from "typescript";
import { Text } from "@angular/compiler";
import { homePage } from "../support/page_objects/homePage";
import { mariosDialogPage } from "../support/page_objects/mariosDialogPage";
import { receivedMariosesPage } from "cypress/support/page_objects/receivedMariosesPage";
import { sentMariosesPage } from "cypress/support/page_objects/sentMariosesPage";

import { getTextNthWord } from "../support/utils"


describe('Basic Marioses browsing tests', () => {

  beforeEach("Open home page", () => {
    cy.openHomePage();
    cy.wait(100);
  });

  it("Display last marios", () => {

    homePage.checkLastMariosLabel()
    homePage.checkAddButton()     // REMOVE THIS
    homePage.checkLastMariosesCount(9)
 
    let lastMariosComment = homePage.checkAndGetLastMariosComment()
    let commentFirstWord = getTextNthWord(lastMariosComment,1)
    let mariosFirstUser = homePage.checkAndGetLastMariosUser()

    homePage.clickLastMariosTile()
    
    mariosDialogPage.checkCommentFirstWord(commentFirstWord)
    mariosDialogPage.checkFirstUser(mariosFirstUser)
  });

  it("Display received marioses", () => {

    homePage.checkReceivedMariosesCountGreaterThan(0)
    let receivedMariosesCount = homePage.getReceivedMariosesCount()

    homePage.clickReceivedMariosesCard()
    receivedMariosesPage.checkReceivedMariosLabel()
    receivedMariosesPage.checkBackButton()

    receivedMariosesPage.checkMariosesCountGreaterThan(0)
    // !!!!!!
    receivedMariosesPage.checkReceivedMariosesCount(receivedMariosesCount)

    receivedMariosesPage.clickBackButton()
    homePage.checkLastMariosLabel()
  })


  
});
