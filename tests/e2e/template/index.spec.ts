import mockPostPlans from '../../api/workspaces/wid/plans/_post/201_Example_1.json';
import getProjects from '../../api/workspaces/wid/projects/_get/200_Example_1.json';
import getTemplate from '../../api/workspaces/wid/templates/tid/_get/200_Example_1.json';
import { expect, test } from '../../fixtures/app';
import { PlanCreationInterface } from '../../fixtures/components/PlanCreationInterface';
import { Template } from '../../fixtures/pages/Template';

test.describe('template page', () => {
  let template: Template;
  let planCreationInterface: PlanCreationInterface;

  test.beforeEach(async ({ page }) => {
    template = new Template(page);
    planCreationInterface = new PlanCreationInterface(page);
    await template.loggedIn();
    await template.mockPreferences();
    await template.mockWorkspace();
    await template.mockGetTemplate();
    await template.mockGetProjects();
    await planCreationInterface.mockGetNewPlan();
    await template.mockWorkspacesList();
    await template.mockPostPlans();
    await template.open();
  });

  test('Once the launch activity button is clicked a plan creation interface appear', async () => {
    await expect(template.elements().planCreationInterface()).not.toBeVisible();
    await expect(template.elements().title()).toHaveText(
      Template.getTemplateTitle(getTemplate)
    );
    await expect(template.elements().launchActivityButton()).toHaveCount(2);
    await template.elements().launchActivityButton().nth(1).click();
    await expect(template.elements().planCreationInterface()).toBeVisible();
  });

  test('Once a project is selected from the drawer is possible to start an activity', async ({
    page,
  }) => {
    const newPlanId = mockPostPlans.id;
    const createPlan = page.waitForResponse(
      (response) =>
        /\/api\/workspaces\/1\/plans/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'POST'
    );
    const projectName = getProjects.items[0].name;
    const projectId = getProjects.items[0].id;
    await template.elements().launchActivityButton().nth(1).click();
    // attempt to create a plan without selecting a project
    await template.elements().confirmButton().click();
    await expect(template.elements().errorMessage()).toBeVisible();
    // select a project
    await template.elements().projectDropdown().click();
    await page.getByRole('option', { name: projectName }).click();
    await expect(
      template.elements().projectDropdown().locator('input')
    ).toHaveValue(projectName);
    await expect(template.elements().errorMessage()).not.toBeVisible();
    // attempt to create a plan with a project selected
    await template.elements().confirmButton().click();
    const response = await createPlan;
    const data = response.request().postDataJSON();
    expect(data).toEqual({
      project_id: projectId,
      template_id: getTemplate.id,
    });
    // expect that navigation to the plan page is triggered
    await expect(page).toHaveURL(`/plans/${newPlanId}?tab=setup`);
  });
});
