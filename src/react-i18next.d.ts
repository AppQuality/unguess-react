import 'react-i18next';
import enLinks from './locales/en/links.json';
import en from './locales/en/translation.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
      links: typeof enLinks;
    };
    allowObjectInHTMLChildren: true;
  }
}
