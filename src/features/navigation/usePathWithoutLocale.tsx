import { useMatches } from 'react-router-dom';
import i18n from 'src/i18n';

export const usePathWithoutLocale = () => {
  const [, ...matches] = useMatches();
  const currentLanguage = i18n.language === 'en' ? '' : `/${i18n.language}`;

  if (!matches.length) return false;

  return matches[matches.length - 1].pathname.replace(currentLanguage, '');
};
