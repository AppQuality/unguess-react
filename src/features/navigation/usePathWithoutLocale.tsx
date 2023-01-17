import { useMatches } from 'react-router-dom';

export const usePathWithoutLocale = () => {
  const [locale, ...matches] = useMatches();
  if (!matches.length) return false;
  return matches[matches.length - 1].pathname.replace(locale.pathname, '');
};
