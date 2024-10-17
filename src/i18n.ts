import countries from 'i18n-iso-countries';
import * as enLocale from 'i18n-iso-countries/langs/en.json';
import * as esLocale from 'i18n-iso-countries/langs/es.json';
import * as itLocale from 'i18n-iso-countries/langs/it.json';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { isDev } from './common/isDevEnvironment';
import ach from './locales/ach/translation.json';
import enLinks from './locales/en/links.json';
import en from './locales/en/translation.json';
import itLinks from './locales/it/links.json';
import it from './locales/it/translation.json';

// the translations
// (tip move them in a JSON file and import them)
countries.registerLocale(enLocale);
countries.registerLocale(itLocale);
countries.registerLocale(esLocale);

const resources = {
  en: { translation: en, links: enLinks },
  it: { translation: it, links: itLinks },
  ...(isDev() && { ach: { translation: ach, links: {} } }),
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      order: ['querystring', 'path', 'subdomain'],
    },
    contextSeparator: '_',
    ns: ['common', 'translation', 'links'],
    defaultNS: 'translation',
    returnEmptyString: false,
    nsSeparator: false,
    resources,
    supportedLngs: ['it', 'en', ...(isDev() ? ['ach'] : [])],
    fallbackLng: 'en',
    keySeparator: ':::',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
