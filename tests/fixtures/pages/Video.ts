import { type Page } from '@playwright/test';
import { UnguessPage } from '../UnguessPage';

export class VideoPage extends UnguessPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = `campaigns/1/videos/1`;
  }

  elements() {
    return {
      ...super.elements(),
      paragraphContent: () =>
        this.page.getByTestId('transcript-paragraph').locator('.content'),
      sentimentWrapper: () => this.page.getByTestId('transcript-sentiment'),
      sentimentItem: () =>
        this.page
          .getByTestId('transcript-sentiment')
          .locator('[data-garden-id="tags.tag_view"]'),
      observationAccordion: (id: number) =>
        this.page.getByTestId(`observation-accordion-${id}`),
      comboboxVideoTitle: (id: number) =>
        this.elements()
          .observationAccordion(id)
          .getByTestId(`video-title-dropdown`),
      comboboxVideoTags: (id: number) =>
        this.elements()
          .observationAccordion(id)
          .getByTestId(`video-tags-dropdown`),
      optionsItem: (itemID: string) =>
        this.page.locator(`[itemid="${itemID}"]`),
      tooltipModalOptions: () => this.page.getByTestId('tooltip-modal-option'),
      tooltipModalOptionsSaveButton: () =>
        this.elements()
          .tooltipModalOptions()
          .getByRole('button', {
            name: this.i18n.t('__VIDEO_PAGE_DROPDOWN_EDIT_MODAL_SAVE_BUTTON'),
          }),
      toastThemeEditSuccessMessage: () =>
        this.page.getByText(
          this.i18n.t(
            '__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_SUCCESS_TOAST_MESSAGE'
          )
        ),
      tooltipModalOptionsThemeInput: () =>
        this.elements()
          .tooltipModalOptions()
          .getByLabel(
            this.i18n.t('__VIDEO_PAGE_THEMES_DROPDOWN_EDIT_MODAL_LABEL')
          ),
    };
  }

  async openObservationAccordion(id: number) {
    await this.elements().observationAccordion(id).click();
  }

  async openComboboxVideoTitle(id: number) {
    await this.elements().comboboxVideoTitle(id).click();
  }

  async openComboboxVideoTags(id: number) {
    await this.elements().comboboxVideoTags(id).click();
  }

  async clickOptionItem(itemID: string) {
    await this.elements().optionsItem(itemID).click();
  }

  async clickOptionItemActions(itemID: string) {
    await this.elements()
      .optionsItem(itemID)
      .getByTestId('select-option-actions')
      .click();
  }

  async mockGetCampaign() {
    await this.page.route('*/**/api/campaigns/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/campaigns/cid/_get/200_Example_1.json',
      });
    });
  }

  async mockPatchVideoTag(id: string, error?: number | boolean) {
    await this.page.route(
      `*/**/api/campaigns/1/video-tags/${id}`,
      async (route) => {
        if (route.request().method() === 'PATCH') {
          console.log('titledrop api response', error);
          if (error === 409) {
            await route.fulfill({
              status: 409,
            });
          } else if (error === true) {
            await route.fulfill({
              status: 500,
            });
          } else {
            await route.fulfill({
              status: 200,
            });
          }
        } else {
          await route.fallback();
        }
      }
    );
  }

  async mockGetVideoTags() {
    await this.page.route('*/**/api/campaigns/1/video-tags', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          path: 'tests/api/campaigns/cid/video-tags/_get/200_Example_1.json',
        });
      } else {
        await route.fallback();
      }
    });
  }

  async mockGetVideo() {
    await this.page.route('*/**/api/videos/1', async (route) => {
      await route.fulfill({
        path: 'tests/api/videos/vid/_get/200_consistency_paragraphs_sentiments.json',
      });
    });
  }

  async mockGetVideoObservations() {
    await this.page.route('*/**/api/videos/1/observations', async (route) => {
      await route.fulfill({
        path: 'tests/api/videos/vid/observations/_get/200_Example_1.json',
      });
    });
  }
}
