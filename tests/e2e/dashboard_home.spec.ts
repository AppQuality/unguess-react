import { test, expect } from '../fixtures/app';
import { Dashboard } from '../fixtures/pages/DashboardHome';
import { PlanCreationInterface } from '../fixtures/components/PlanCreationInterface';
import { PromoList } from '../fixtures/components/PromoList';

test.describe('Home page', () => {
  let dashboard: Dashboard;
  let planCreationInterface: PlanCreationInterface;
  let promoList: PromoList;

  test.beforeEach(async ({ page }) => {
    dashboard = new Dashboard(page);
    planCreationInterface = new PlanCreationInterface(page);
    promoList = new PromoList(page);

    await dashboard.loggedIn();
    await dashboard.mockPreferences();
    await dashboard.mockWorkspace();
    await planCreationInterface.mockGetProjects();
    await planCreationInterface.mockPostPlans();
    await dashboard.mockWorkspacesList();
    await promoList.mockPromoTemplates();
    await dashboard.open();
  });
  test('has title', async ({ i18n }) => {
    const title = dashboard.elements().title();
    await expect(title).toBeVisible();
    await expect(title).toHaveText(i18n.t('__PAGE_TITLE_PRIMARY_DASHBOARD'));
  });

  test('has a create new PJ CTA that open an modal', async () => {
    await dashboard.elements().launchNewPJButton().click();
    await expect(dashboard.page.getByRole('dialog')).toBeVisible();
  });

  test('should show a list of suggested templates in promo', async () => {
    await expect(dashboard.elements().title()).toBeVisible();
    await expect(promoList.elements().promoList()).toBeVisible();
    await expect(promoList.elements().promoListItems()).toHaveCount(
      promoList.promoItems.length
    );
  });

  test('should open the create plan interface when clicking on a promo item, a more info should go to the single template', async ({
    page,
  }) => {
    await promoList.elements().promoListItems().first().click();
    await expect(
      planCreationInterface.elements().planCreationInterface()
    ).toBeVisible();
    await expect(
      planCreationInterface.elements().moreInfoButton()
    ).toBeVisible();
    await planCreationInterface.elements().moreInfoButton().click();
    await expect(page).toHaveURL(`/templates/${promoList.promoItems[0].id}`);
  });

  test('Once a project is selected from the drawer is possible to start an activity', async ({
    page,
  }) => {
    const newPlanId = planCreationInterface.postPlans.id;

    await promoList.elements().promoListItems().first().click();
    // attempt to create a plan without selecting a project
    await planCreationInterface.elements().confirmButton().click();
    await expect(planCreationInterface.elements().errorMessage()).toBeVisible();
    // select a project
    await planCreationInterface.selectProject();
    await expect(
      planCreationInterface.elements().projectDropdown().locator('input')
    ).toHaveValue(planCreationInterface.projectName);
    await expect(
      planCreationInterface.elements().errorMessage()
    ).not.toBeVisible();
    const response = await planCreationInterface.createPlan();
    const data = response.request().postDataJSON();
    expect(data).toEqual({
      project_id: planCreationInterface.projectId,
      template_id: promoList.promoItems[0].id,
    });
    // expect that navigation to the plan page is triggered
    await expect(page).toHaveURL(`/plans/${newPlanId}?tab=summary`);
  });
});
