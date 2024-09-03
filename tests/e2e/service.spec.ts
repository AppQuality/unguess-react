import { test, expect } from '../fixtures/app';

test.describe('Service page', () => {
  test.beforeEach(async ({ page }) => {});

  test('if a client has been feature flagged "new-express" see two express card in the featured services section: functional and experiential', async () => {});
  test('if the client click the cta into the functional card a sidebar opens with a title (same as card title), description, a list of meta, a select to choose or create a new project fo the cp and a cta to launch the cp', async () => {});
  test('if the client click the cta without selecting a project see an error, once the project is selected the client can enter the new express creation screen: step 1', async () => {});
});

test.describe('Express creation screen', () => {
  test.beforeEach(async ({ page }) => {});

  test('there is a text input in very step to name the cp, a couple of buttons to go back and to submit the current screen, and an X btn to close. The close btn close and delete the current progress. Theres a modal to prevent accidentally delete everything', async () => {});
  test('Step 1: shows a form with title, a text input to name the cp a radio like input to choose the test methodology. There are 3 choices: usability, BUT, survey. (TBD if 3 or 2 choices)', async () => {});

  test.describe('Step 2: Usability -> What', () => {
    test('there is a stepper component that shows: what, who, where, how, recap + launch. Is possible to navigate back and forth through the steps', async () => {});
    test('The What section shows: title of the whole step page, section with title and product to test (radio like choice) with website, mobile app or prototype. Section with title and a textarea. All fields are mandatory. An error is displyed if you try to submit without completing all fields', async () => {});
  });
  test.describe('Step 3: Usability -> Who', () => {
    test('Here the client can choose between private panel and unguess panel. Unguess panel is default choice, preselected', async () => {});
    test.describe('Unguess panel', () => {
      test('There is a demographic section with title and 3 radio fields. Age range (16-24, 25-34, 35-54, 55-70, all ages), gender (all genders, male, female), digital literacy (all-levels, expert, intermediate, basic). All fields are mandatory', async () => {});
      test('', async () => {});
    });
    test.describe('Private panel', () => {
      test('', async () => {});
    });
  });
  test.describe('Step 4: Usability -> Who', () => {
    test('Here the client can choose between private panel and unguess panel. Unguess panel is default choice, preselected', async () => {});
    test.describe('Unguess panel', () => {
      test('There is a demographic section with title and 3 radio fields. Age range (16-24, 25-34, 35-54, 55-70, all ages), gender (all genders, male, female), digital literacy (all-levels, expert, intermediate, basic). All fields are mandatory', async () => {});
      test('', async () => {});
    });
    test.describe('Private panel', () => {
      test('', async () => {});
    });
  });
});
