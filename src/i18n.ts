import countries from 'i18n-iso-countries';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { locizePlugin } from 'locize';
import Locize from 'i18next-locize-backend';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import it from './locales/it/translation.json';
import { isDev } from './common/isDevEnvironment';

// the translations
// (tip move them in a JSON file and import them)
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
countries.registerLocale(require('i18n-iso-countries/langs/it.json'));

i18n
  .use(LanguageDetector)
  .use(Locize)
  .use(locizePlugin)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    backend: {
      projectId: `${process.env.REACT_APP_LOCIZE_PROJECT_ID}`,
      apiKey: `${process.env.REACT_APP_LOCIZE_API_KEY}`,
      referenceLng: 'en',
      version: isDev() ? 'latest' : 'production',
      // loadPath: 'https://api.locize.io/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      // private: !isDev(),
      // pull: isDev(),
      // pullPath: 'https://api.locize.io/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      // addPath: 'https://api.locize.io/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      // updatePath: 'https://api.locize.io/{{projectId}}/{{version}}/{{lng}}/{{ns}}',
      // crossDomain: true,
      // setContentTypeJSON: true,
    },
    react: {
      bindI18n: 'languageChanged editorSaved',
    },
    detection: {
      order: ['querystring', 'path', 'subdomain'],
    },
    contextSeparator: '_',
    ns: ['common', 'translation', 'links'],
    defaultNS: 'translation',
    returnEmptyString: false,
    nsSeparator: false,
    supportedLngs: ['it', 'en'],
    fallbackLng: 'en',
    keySeparator: ':::',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
