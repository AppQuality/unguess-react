import { useTranslation } from 'react-i18next';
import {
  AsideNav,
  StickyNavItem,
} from 'src/common/components/navigation/asideNav';
import { useTemplatesContext } from './Context';

const CategoriesNav = () => {
  const { templatesByCategory } = useTemplatesContext();
  const { t } = useTranslation();
  return (
    <AsideNav containerId="main">
      {templatesByCategory.tailored.length > 0 && (
        <StickyNavItem
          to={t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}
          containerId="main"
          spy
          smooth
          duration={500}
          offset={-350}
        >
          {t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}
        </StickyNavItem>
      )}
      {templatesByCategory.unguess.length > 0 && (
        <StickyNavItem
          to={t('__TEMPLATES_PAGE_UNGUESS_LIST_TITLE')}
          containerId="main"
          spy
          smooth
          duration={500}
          offset={-350}
        >
          {t('__TEMPLATES_PAGE_UNGUESS_LIST_TITLE')}
        </StickyNavItem>
      )}
    </AsideNav>
  );
};

export { CategoriesNav };
