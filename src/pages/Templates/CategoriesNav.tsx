import { useTranslation } from 'react-i18next';
import {
  AsideNav,
  StickyNavItem,
} from 'src/common/components/navigation/asideNav';
import { useTemplatesContext } from './Context';

const CategoriesNav = () => {
  const { templatesByCategory, promoTemplates, tailoredTemplates } =
    useTemplatesContext();
  const { t } = useTranslation();
  console.log('templatesByCategory', templatesByCategory);
  return (
    <AsideNav containerId="main" data-qa="templates-nav">
      {tailoredTemplates.length > 0 && (
        <StickyNavItem
          role="link"
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
      {promoTemplates.length > 0 && (
        <StickyNavItem
          role="link"
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
      {templatesByCategory.map((category) => (
        <StickyNavItem
          role="link"
          key={category.id}
          to={category.id.toString()}
          containerId="main"
          spy
          smooth
          duration={500}
          offset={-350}
        >
          {category.name || `Category ${category.id}`}
        </StickyNavItem>
      ))}
    </AsideNav>
  );
};

export { CategoriesNav };
