import { test as base } from '@playwright/test';
import { createI18nFixture } from 'playwright-i18next-fixture';
import enLinks from '../../src/locales/en/links.json';
import en from '../../src/locales/en/translation.json';
import itLinks from '../../src/locales/it/links.json';
import it from '../../src/locales/it/translation.json';

const resources = {
  en: { translation: en, links: enLinks },
  it: { translation: it, links: itLinks },
};

const i18nFixture = createI18nFixture({
  options: {
    detection: {
      order: ['querystring', 'path', 'subdomain'],
    },
    contextSeparator: '_',
    ns: ['common', 'translation', 'links'],
    defaultNS: 'translation',
    returnEmptyString: false,
    nsSeparator: false,
    resources,
    supportedLngs: ['it', 'en'],
    fallbackLng: 'en',
    keySeparator: ':::',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  },
  // Fetch translations in every test or fetch once
  // Default: true
  cache: true,
  // Run as auto fixture to be available through all tests by getI18nInstance()
  // Default: true
  auto: true,
});

export const test = base.extend(i18nFixture);
export { expect } from '@playwright/test';
