import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/Plan';

test.describe('The digital literacy module defines the users digital skills.', () => {
  let moduleBuilderPage: PlanPage;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);
    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetDraftWithOnlyMandatoryModulesPlan();
    await moduleBuilderPage.open();
  });

  test('It should have an output of an array of objects with level and percentage, and it is required to have at least 1 item to Request a Quote', async () => {
    expect(moduleBuilderPage.elements().digitalLiteracyModule()).toExist();
    moduleBuilderPage.elements().digitalLiteracyModule().click();
  });

  /*
- sia visibile il bottone delete modulo
- siano visibili le checkbox all level e le tre singole
- se non c'è una checkbox selezionata, c'è un errore
- se c'è almeno una checkbox selezionata, non c'è errore
- se clicco su una checkbox, la checkbox all levels deve essere deselezionata (opionale)
- se clicco su all levels, tutte le checkbox devono essere selezionate (opzionale)
- config literacy con tutti i livelli selezionati, mi aspetto le 3 checkbox selezionate e all levels selezionata
- config literacy con nessun livello selezionato, mi aspetto nessuna checkbox selezionata e all levels deselezionata
- config literacy con solo un livello selezionato, mi aspetto una checkbox selezionata e all levels deselezionata

  */

  test('All levels checkbox should be checked when the page is opened', async () => {
    // Todo
  });

  test(`It should have at least one checkbox checked`, async () => {
    // Todo
  });

  test('There should be a cta to remove a task that remove the item from the list', async () => {});
});
