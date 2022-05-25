import countries from 'i18n-iso-countries';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enLinks from './locales/en/links.json';
import en from './locales/en/translation.json';
import itLinks from './locales/it/links.json';
import it from './locales/it/translation.json';

// the translations
// (tip move them in a JSON file and import them)
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/it.json'));
countries.registerLocale(require('i18n-iso-countries/langs/es.json'));

const resources = {
  en: { translation: en, links: enLinks },
  it: { translation: it, links: itLinks },
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
    supportedLngs: ['it', 'en'],
    fallbackLng: 'en',
    keySeparator: ':::',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
