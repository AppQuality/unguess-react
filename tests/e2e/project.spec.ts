import { test, expect } from '../fixtures/app';
import { Project } from '../fixtures/pages/Project';
import { PlanCreationInterface } from '../fixtures/components/PlanCreationInterface';
import { PromoList } from '../fixtures/components/PromoList';

test.describe('project page', () => {
  let project: Project;
  let planCreationInterface: PlanCreationInterface;
  let promoList: PromoList;

  test.beforeEach(async ({ page }) => {
    project = new Project(page);
    planCreationInterface = new PlanCreationInterface(page);
    promoList = new PromoList(page);

    await project.loggedIn();
    await project.mockPreferences();
    await project.mockWorkspace();
    await project.mockworkspacesPlans();
    await project.mockworkspacesCampaigns();
    await project.mockProject();
    await project.mockProjectCampaigns();
    await planCreationInterface.mockGetProjects();
    await planCreationInterface.mockPostPlans();
    await planCreationInterface.mockPostProject();
    await promoList.mockPromoTemplates();
    await project.mockWorkspacesList();
    await project.open();
  });

  test('should display a list of campaigns', async () => {
    await expect(project.elements().projectsTable()).toBeVisible();
    await expect(project.elements().projectsTableItems()).toHaveCount(
      project.projectCampaigns.length
    );
    await expect(promoList.elements().promoList()).toBeVisible();
    await expect(promoList.elements().promoListItems()).toHaveCount(
      promoList.promoItems.length
    );
  });

  test('should open the create plan interface when clicking on a promo item, preselected project in dropdown and a more info should go to the single template', async ({
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

  test('is possible to start an activity in the curent project', async ({
    page,
  }) => {
    const newPlanId = planCreationInterface.postPlans.id;

    await promoList.elements().promoListItems().first().click();
    await expect(
      planCreationInterface.elements().projectDropdown().locator('input')
    ).toHaveValue(planCreationInterface.projectName);
    const response = await planCreationInterface.createPlan();
    const data = response.request().postDataJSON();
    expect(data).toEqual({
      project_id: planCreationInterface.projectId,
      template_id: promoList.promoItems[0].id,
    });
    // expect that navigation to the plan page is triggered
    await expect(page).toHaveURL(`/plans/${newPlanId}`);
  });

  test('is possible to create a new project from the plan creation interface', async ({
    page,
  }) => {
    await promoList.elements().promoListItems().first().click();
    await expect(
      planCreationInterface.elements().projectDropdownInput()
    ).toHaveValue(planCreationInterface.projectName);

    // create a new project
    await planCreationInterface.createProject();

    // create a plan with the new project
    const response = await planCreationInterface.createPlan();
    const data = response.request().postDataJSON();
    expect(data).toEqual({
      project_id: planCreationInterface.newProjectId,
      template_id: promoList.promoItems[0].id,
    });
    // expect that navigation to the plan page is triggered
    await expect(page).toHaveURL(
      `/plans/${planCreationInterface.postPlans.id}`
    );
  });
});

test.describe('project page empty state', () => {
  let project: Project;
  let planCreationInterface: PlanCreationInterface;
  let promoList: PromoList;

  test.beforeEach(async ({ page }) => {
    project = new Project(page);
    planCreationInterface = new PlanCreationInterface(page);
    promoList = new PromoList(page);

    await project.loggedIn();
    await project.mockPreferences();
    await project.mockWorkspace();
    await project.mockEmptyProject();
    await planCreationInterface.mockGetProjects();
    await planCreationInterface.mockPostPlans();
    await project.mockWorkspacesList();
    await promoList.mockPromoTemplates();
    await project.open();
  });

  test('should display no campaigns, a list of suggested templates in promo', async () => {
    await expect(project.elements().projectsTable()).not.toBeVisible();
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

  test('is possible to start an activity in the curent project', async ({
    page,
  }) => {
    const newPlanId = planCreationInterface.postPlans.id;

    await promoList.elements().promoListItems().first().click();
    await expect(
      planCreationInterface.elements().projectDropdown().locator('input')
    ).toHaveValue(planCreationInterface.projectName);
    const response = await planCreationInterface.createPlan();
    const data = response.request().postDataJSON();
    expect(data).toEqual({
      project_id: planCreationInterface.projectId,
      template_id: promoList.promoItems[0].id,
    });
    // expect that navigation to the plan page is triggered
    await expect(page).toHaveURL(`/plans/${newPlanId}`);
  });
});
