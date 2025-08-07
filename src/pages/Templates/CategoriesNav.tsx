import { useTranslation } from 'react-i18next';
import {
  AsideNav,
  StickyNavItem,
  StickyNavItemLabel,
} from 'src/common/components/navigation/asideNav';
import styled from 'styled-components';
import { useTemplatesContext } from './Context';

const DisabledNavWrapper = styled.div<{ disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const CategoriesNav = () => {
  const {
    templatesByCategory,
    promoTemplates,
    tailoredTemplates,
    searchQuery,
  } = useTemplatesContext();
  const { t } = useTranslation();

  const isDisabled = !!searchQuery;

  return (
    <DisabledNavWrapper disabled={isDisabled}>
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
            disabled={isDisabled}
          >
            {t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}
          </StickyNavItem>
        )}
        <StickyNavItemLabel>
          {t('__TEMPLATES_PAGE_UNGUESS_LIST_TITLE')}
        </StickyNavItemLabel>
        {promoTemplates.length > 0 && (
          <StickyNavItem
            role="link"
            to={t('__TEMPLATES_PAGE_PROMO_LIST_TITLE')}
            containerId="main"
            spy
            smooth
            duration={500}
            offset={-350}
          >
            {t('__TEMPLATES_PAGE_PROMO_LIST_TITLE')}
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
            disabled={isDisabled}
          >
            {category.name || `Category ${category.id}`}
          </StickyNavItem>
        ))}
      </AsideNav>
    </DisabledNavWrapper>
  );
};

export { CategoriesNav };
