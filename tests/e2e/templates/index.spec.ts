import mockPostPlans from '../../api/workspaces/wid/plans/_post/201_Example_1.json';
import getProjects from '../../api/workspaces/wid/projects/_get/200_Example_1.json';
import getTemplates from '../../api/workspaces/wid/templates/_get/200_global_and_private_templates.json';
import { expect, test } from '../../fixtures/app';
import { Templates } from '../../fixtures/pages/Templates';

test.describe('Templates page', () => {
  let templates: Templates;

  test.beforeEach(async ({ page }) => {
    templates = new Templates(page);
    await templates.loggedIn();
    await templates.mockPreferences();
    await templates.mockWorkspace();
    await templates.mockWorkspacesList();
    await templates.mockGetTemplates();
    await templates.mockGetCategories();
    await templates.mockGetProjects();
    await templates.mockPostPlans();
    await templates.open();
  });

  test('Should contain a number of cards equal to the number of templates plus the promo templates. Divided by tailored, suggested by us, and categories', async ({
    page,
  }) => {
    await expect(templates.elements().templateCard()).toHaveCount(14);
    await expect(templates.elements().tailoredSection()).toBeVisible();
    await expect(templates.elements().unguessSection()).toBeVisible();

    await expect(
      templates.elements().tailoredSection().getByRole('listitem')
    ).toHaveCount(4);
    await expect(
      templates.elements().unguessSection().getByRole('listitem')
    ).toHaveCount(5);

    // Check category sections
    const section1 = page.getByTestId(`category-section-10`);
    const section2 = page.getByTestId(`category-section-20`);
    const section3 = page.getByTestId(`category-section-30`);

    await expect(section1).toBeVisible();
    await expect(section1.getByRole('listitem')).toHaveCount(2);
    await expect(section2).toBeVisible();
    await expect(section2.getByRole('listitem')).toHaveCount(2);
    await expect(section3).toBeVisible();
    await expect(section3.getByRole('listitem')).toHaveCount(1);

    // check navigation
    await expect(templates.elements().pageNavigation()).toBeVisible();
    await expect(
      templates.elements().pageNavigation().getByRole('link')
    ).toHaveCount(5);
  });

  test('The page should have search box that filters templates', async () => {
    await expect(templates.elements().searchBox()).toBeVisible();
    await expect(templates.elements().searchBox()).toHaveAttribute(
      'placeholder',
      templates.i18n.t('__TEMPLATES_PAGE_SEARCH_PLACEHOLDER')
    );
    await templates.elements().searchBox().fill('bug hunting');
    await expect(templates.elements().templateCard()).toHaveCount(1);
    await templates.elements().searchBox().fill('non existing template');
    await expect(templates.elements().templateCard()).toHaveCount(0);
    // clear search box
    await templates.elements().searchBox().fill('');
    await expect(templates.elements().templateCard()).toHaveCount(14);
  });

  test('Once a card is clicked a creation interface shoud appear', async ({
    page,
  }) => {
    const lastTemplate = getTemplates.items[getTemplates.items.length - 1];
    await templates.elements().templateCard().first().click();
    await expect(templates.elements().planCreationInterface()).toBeVisible();
    await expect(templates.elements().moreInfoButton()).not.toBeVisible();
    // i can click to close the drawer
    await templates
      .elements()
      .planCreationInterface()
      .getByTestId('close-button')
      .click();
    await expect(
      templates.elements().planCreationInterface()
    ).not.toBeVisible();
    // if the template is unguess there is a more info button
    await templates.elements().templateCard().last().click();
    await expect(templates.elements().planCreationInterface()).toBeVisible();
    await expect(templates.elements().moreInfoButton()).toBeVisible();
    await templates.elements().moreInfoButton().click();
    await expect(page).toHaveURL(`/templates/${lastTemplate.id}`);
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
    await templates.elements().templateCard().first().click();
    // attempt to create a plan without selecting a project
    await templates.elements().confirmButton().click();
    await expect(templates.elements().errorMessage()).toBeVisible();
    // select a project
    await templates.elements().projectDropdown().click();
    await page.getByRole('option', { name: projectName }).click();
    await expect(
      templates.elements().projectDropdown().locator('input')
    ).toHaveValue(projectName);
    await expect(templates.elements().errorMessage()).not.toBeVisible();
    // attempt to create a plan with a project selected
    await templates.elements().confirmButton().click();
    const response = await createPlan;
    const data = response.request().postDataJSON();
    expect(data).toEqual({
      project_id: projectId,
      template_id: getTemplates.items[0].id,
    });
    // expect that navigation to the plan page is triggered
    await expect(page).toHaveURL(`/plans/${newPlanId}`);
  });
});

test.describe('If I have workspace access', () => {
  let templates: Templates;

  test.beforeEach(async ({ page }) => {
    templates = new Templates(page);
    await templates.loggedIn();
    await templates.mockPreferences();
    await templates.mockWorkspace();
    await templates.mockWorkspacesList();
    await templates.mockGetTemplates();
    await templates.mockGetProjects();
    await templates.mockPostPlans();
  });

  test('I should see the menu item', async ({ page }) => {
    await page.goto('/');
    await expect(templates.elements().mainNavigation()).toBeVisible();
    await expect(templates.elements().navigationItem()).toBeVisible();
  });

  test('The Templates page should be accessible', async ({ page }) => {
    await templates.open();
    await expect(page).toHaveURL(/\/templates/);
  });
});

test.describe("If i don't have workspace access", () => {
  let templates: Templates;

  test.beforeEach(async ({ page }) => {
    templates = new Templates(page);
    await templates.loggedIn();
    await templates.mockPreferences();
    await templates.mockWorkspace();

    // shared workspaces means no workspace access right now
    await templates.mocksharedWorkspacesList();

    await templates.mockGetTemplatesWithoutPermissions();
    await templates.mockGetProjects();
    await templates.mockPostPlans();
  });

  test('I should not see the menu item', async ({ page }) => {
    await page.goto('/');
    await expect(templates.elements().mainNavigation()).toBeVisible();
    await expect(templates.elements().navigationItem()).not.toBeVisible();
  });

  test('The Templates page should redirect to the 404 /oops', async ({
    page,
  }) => {
    await templates.open();
    await expect(page).toHaveURL(/\/oops/);
  });
});
