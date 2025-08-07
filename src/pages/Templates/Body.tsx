import { MD, Separator, XXL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useTemplatesContext } from './Context';
import { TemplateCardsGrid } from './TemplateCardsGrid';

const StyledSection = styled.section`
  margin-bottom: ${(p) => p.theme.space.xxl};
  container-type: inline-size;
  container-name: cardsWrapper;
  ${XXL} {
    margin-bottom: ${(p) => p.theme.space.xs};
    color: ${(p) => p.theme.palette.blue[600]};
  }
  ${MD} {
    margin-bottom: ${(p) => p.theme.space.md};
    color: ${(p) => p.theme.palette.grey[700]};
  }
`;

const Body = () => {
  const { t } = useTranslation();
  const { templatesByCategory, promoTemplates, tailoredTemplates } =
    useTemplatesContext();
  return (
    <>
      {tailoredTemplates.length > 0 && (
        <StyledSection
          id={t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}
          title={t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}
        >
          <XXL isBold>{t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}</XXL>
          <MD>{t('__TEMPLATES_PAGE_TAILORED_LIST_SUBTITLE')}</MD>
          <Separator />
          <TemplateCardsGrid templates={tailoredTemplates} />
        </StyledSection>
      )}
      {promoTemplates.length > 0 && (
        <StyledSection
          id={t('__TEMPLATES_PAGE_PROMO_LIST_TITLE')}
          title={t('__TEMPLATES_PAGE_PROMO_LIST_TITLE')}
        >
          <XXL isBold>{t('__TEMPLATES_PAGE_PROMO_LIST_TITLE')}</XXL>
          <MD>{t('__TEMPLATES_PAGE_UNGUESS_LIST_SUBTITLE')}</MD>
          <Separator />
          <TemplateCardsGrid templates={promoTemplates} />
        </StyledSection>
      )}
      {templatesByCategory.length > 0 && (
        <>
          {templatesByCategory.map((category) => {
            const categoryId = category.id.toString();
            return (
              <StyledSection
                key={categoryId}
                id={categoryId}
                data-qa={`category-section-${categoryId}`}
                title={category.name || `Category ${categoryId}`}
              >
                <XXL isBold>{category.name}</XXL>
                <MD>{category.description}</MD>
                <Separator />
                <TemplateCardsGrid templates={category.templates} />
              </StyledSection>
            );
          })}
        </>
      )}
    </>
  );
};

export default Body;
