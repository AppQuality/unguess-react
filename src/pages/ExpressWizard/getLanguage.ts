import * as dateFns from 'date-fns';
import { enGB, it } from 'date-fns/locale';
import { t } from 'i18next';
import { RELATIVE_DATE_FORMAT_OPTS } from 'src/constants';

interface Language {
  label: string;
  locale: dateFns.Locale;
  relativeDateFormat: { [key: string]: string };
}

export const getLanguage = (lang: string): Language => {
  let label;
  let locale;
  let relativeDateFormat;
  switch (lang) {
    case 'en':
      label = t('English');
      locale = enGB;
      relativeDateFormat = RELATIVE_DATE_FORMAT_OPTS.en;
      break;
    case 'it':
      label = t('Italian');
      locale = it;
      relativeDateFormat = RELATIVE_DATE_FORMAT_OPTS.it;
      break;
    default:
      label = t('English');
      locale = enGB;
      relativeDateFormat = RELATIVE_DATE_FORMAT_OPTS.en;
      break;
  }

  return {
    label,
    locale,
    relativeDateFormat,
  };
};
