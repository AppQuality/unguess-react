import { expect, test } from '../../fixtures/app';
import { VideoPage } from '../../fixtures/pages/Video';

test.describe('Video page', () => {
  let videopage: VideoPage;

  test.beforeEach(async ({ page }) => {
    videopage = new VideoPage(page);
    await videopage.loggedIn();
    await videopage.mockPreferences();
    await videopage.mockWorkspace();
    await videopage.mockWorkspacesList();
    await videopage.mockGetCampaign();
    await videopage.mockGetVideo();
    await videopage.mockGetVideoTags();
    await videopage.mockGetVideoObservations();
    await videopage.open();
    await videopage.elements().observationAccordion(1).scrollIntoViewIfNeeded();
  });

  // THEMES EDITING TESTS BELOW

  test('should open the edit dialog in the themes combobox and display an input and a summary text for the current item and a save button', async ({
    i18n,
  }) => {
    await videopage.openObservationAccordion(1);
    await videopage.openComboboxVideoTitle(1);
    await videopage.clickOptionItemActions('20767');
    await expect(
      videopage
        .elements()
        .tooltipModalOptions()
        .getByText(i18n.t('__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_TITLE'), {
          exact: true,
        })
    ).toBeVisible();
    await expect(
      videopage.elements().tooltipModalOptionsThemeInput()
    ).toHaveValue(
      'grey 500 andrebbe corretto in tutte le pagine per il testo perchè non'
    );
    await expect(
      videopage
        .elements()
        .tooltipModalOptions()
        .getByText(
          i18n.t('__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_DESCRIPTION_other', {
            count: 3,
            usageNumber: '3',
          })
        )
    ).toBeVisible();
    await expect(
      videopage.elements().tooltipModalOptionsSaveButton()
    ).toBeVisible();
  });

  test('should allow changing the name of a theme', async ({ page }) => {
    await videopage.mockPatchVideoTag('20767');
    const patchTitleTag = page.waitForResponse(
      (response) =>
        /\/api\/campaigns\/1\/video-tags\/20767/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );
    const getVideoTags = page.waitForResponse(
      (response) =>
        /\/api\/campaigns\/1\/video-tags/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'GET'
    );
    await videopage.openObservationAccordion(1);
    await videopage.openComboboxVideoTitle(1);
    await videopage.clickOptionItemActions('20767');
    await videopage
      .elements()
      .tooltipModalOptionsThemeInput()
      .fill('New Theme Name');
    await videopage.elements().tooltipModalOptionsSaveButton().click();
    const patchRequest = await patchTitleTag;
    const requestBody = await patchRequest.request().postDataJSON();
    expect(requestBody).toEqual({
      newTagName: 'New Theme Name',
    });
    // show user a success toast
    await expect(videopage.elements().toastEditSuccessMessage()).toBeVisible();
    // invalidate and refetch video tags
    await getVideoTags;
  });

  test('in the theme edit modal should show an error if trying to save with empty name or an existing theme name', async ({
    i18n,
  }) => {
    await videopage.mockPatchVideoTag('20767', 409);
    await videopage.openObservationAccordion(1);
    await videopage.openComboboxVideoTitle(1);
    await videopage.clickOptionItemActions('20767');
    await videopage.elements().tooltipModalOptionsThemeInput().clear();
    await expect(
      videopage
        .elements()
        .tooltipModalOptions()
        .getByText(
          i18n.t(
            '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_REQUIRED_ERROR'
          )
        )
    ).toBeVisible();
    await expect(
      videopage.elements().tooltipModalOptionsSaveButton()
    ).toBeDisabled();
    await videopage
      .elements()
      .tooltipModalOptionsThemeInput()
      .fill('Existing Theme Name');
    await expect(
      videopage.elements().tooltipModalOptionsSaveButton()
    ).not.toBeDisabled();
    await videopage.elements().tooltipModalOptionsSaveButton().click();
    await expect(
      videopage
        .elements()
        .tooltipModalOptions()
        .getByText(
          i18n.t(
            '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_DUPLICATE_ERROR'
          )
        )
    ).toBeVisible();
    await expect(
      videopage.elements().tooltipModalOptionsSaveButton()
    ).toBeDisabled();
    await videopage
      .elements()
      .tooltipModalOptionsThemeInput()
      .fill('Now Unique Name');
    await expect(
      videopage.elements().tooltipModalOptionsSaveButton()
    ).not.toBeDisabled();
  });

  // TAGS EDITING TESTS BELOW

  test('should open the edit dialog in the tags combobox', async () => {
    await videopage.openObservationAccordion(1);
    await videopage.openComboboxVideoTags(1);
    await videopage.clickOptionItemActions('1103');
    await expect(
      videopage
        .elements()
        .tooltipModalOptions()
        .getByText(
          videopage.i18n.t('__VIDEO_PAGE_TAGS_DROPDOWN_EDIT_MODAL_TITLE'),
          {
            exact: true,
          }
        )
    ).toBeVisible();
    await expect(
      videopage
        .elements()
        .tooltipModalOptions()
        .getByLabel(
          videopage.i18n.t('__VIDEO_PAGE_TAGS_DROPDOWN_EDIT_MODAL_LABEL')
        )
    ).toHaveValue('Bloccante');
    await expect(
      videopage
        .elements()
        .tooltipModalOptions()
        .getByText(
          videopage.i18n.t(
            '__VIDEO_PAGE_TAGS_DROPDOWN_EDIT_MODAL_DESCRIPTION_other',
            {
              count: 5,
              usageNumber: '5',
            }
          )
        )
    ).toBeVisible();
    await expect(
      videopage.elements().tooltipModalOptionsSaveButton()
    ).toBeVisible();
  });

  test('should allow changing the name of a tag', async ({ page }) => {
    await videopage.mockPatchVideoTag('1103');
    const patchTitleTag = page.waitForResponse(
      (response) =>
        /\/api\/campaigns\/1\/video-tags\/1103/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'PATCH'
    );
    const getVideoTags = page.waitForResponse(
      (response) =>
        /\/api\/campaigns\/1\/video-tags/.test(response.url()) &&
        response.status() === 200 &&
        response.request().method() === 'GET'
    );
    await videopage.openObservationAccordion(1);
    await videopage.openComboboxVideoTags(1);
    await videopage.clickOptionItemActions('1103');
    await videopage
      .elements()
      .tooltipModalOptionsTagInput()
      .fill('New Tag Name');
    await videopage.elements().tooltipModalOptionsSaveButton().click();
    const patchRequest = await patchTitleTag;
    const requestBody = await patchRequest.request().postDataJSON();
    expect(requestBody).toEqual({
      newTagName: 'New Tag Name',
    });
    // show user a success toast
    await expect(videopage.elements().toastEditSuccessMessage()).toBeVisible();
    // invalidate and refetch video tags
    await getVideoTags;
  });

  test('in the tag edit modal should show an error if trying to save with empty name or an existing tag name', async ({
    i18n,
  }) => {
    await videopage.mockPatchVideoTag('1103', 409);
    await videopage.openObservationAccordion(1);
    await videopage.openComboboxVideoTags(1);
    await videopage.clickOptionItemActions('1103');
    await videopage.elements().tooltipModalOptionsTagInput().clear();
    await expect(
      videopage
        .elements()
        .tooltipModalOptions()
        .getByText(
          i18n.t(
            '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_REQUIRED_ERROR'
          )
        )
    ).toBeVisible();
    await expect(
      videopage.elements().tooltipModalOptionsSaveButton()
    ).toBeDisabled();
    await videopage
      .elements()
      .tooltipModalOptionsTagInput()
      .fill('Existing Tag Name');
    await expect(
      videopage.elements().tooltipModalOptionsSaveButton()
    ).not.toBeDisabled();
    await videopage.elements().tooltipModalOptionsSaveButton().click();
    await expect(
      videopage
        .elements()
        .tooltipModalOptions()
        .getByText(
          i18n.t(
            '__VIDEO_PAGE_ACTIONS_OBSERVATION_FORM_FIELD_TITLE_DUPLICATE_ERROR'
          )
        )
    ).toBeVisible();
    await expect(
      videopage.elements().tooltipModalOptionsSaveButton()
    ).toBeDisabled();
    await videopage
      .elements()
      .tooltipModalOptionsTagInput()
      .fill('Now Unique Name');
    await expect(
      videopage.elements().tooltipModalOptionsSaveButton()
    ).not.toBeDisabled();
  });
});
