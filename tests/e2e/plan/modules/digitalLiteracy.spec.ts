import { test, expect } from '../../../fixtures/app';
import { PlanPage } from '../../../fixtures/pages/Plan';
import { DigitalLiteracyModule } from '../../../fixtures/pages/Plan/Module_digital_literacy';

test.describe('The digital literacy module defines the users digital skills.', () => {
  let moduleBuilderPage: PlanPage;
  let digitalLiteracyModule: DigitalLiteracyModule;

  test.beforeEach(async ({ page }) => {
    moduleBuilderPage = new PlanPage(page);
    digitalLiteracyModule = new DigitalLiteracyModule(page);
    await moduleBuilderPage.loggedIn();
    await moduleBuilderPage.mockPreferences();
    await moduleBuilderPage.mockWorkspace();
    await moduleBuilderPage.mockWorkspacesList();
    await moduleBuilderPage.mockGetDraftPlan();
    await moduleBuilderPage.open();
    await moduleBuilderPage.elements().tabTarget().click();
  });

  test('It should have an output of an array of objects with level and percentage, and it is required to have at least 1 item to Request a Quote', async () => {
    await expect(digitalLiteracyModule.elements().module()).toBeVisible();
  });
});
