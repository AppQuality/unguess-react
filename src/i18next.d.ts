import 'i18next';
import enLinks from './locales/en/links.json';
import en from './locales/en/translation.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
      links: typeof enLinks;
    };
    allowObjectInHTMLChildren: true;
  }
}
