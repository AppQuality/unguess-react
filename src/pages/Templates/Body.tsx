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
  }
  ${MD} {
    margin-bottom: ${(p) => p.theme.space.md};
  }
`;

const Body = () => {
  const { t } = useTranslation();
  const { templatesByCategory } = useTemplatesContext();
  return (
    <>
      {templatesByCategory.tailored.length > 0 && (
        <StyledSection
          id={t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}
          title={t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}
        >
          <XXL>{t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}</XXL>
          <MD>{t('__TEMPLATES_PAGE_TAILORED_LIST_SUBTITLE')}</MD>
          <Separator />
          <TemplateCardsGrid templates={templatesByCategory.tailored} />
        </StyledSection>
      )}
      {templatesByCategory.unguess.length > 0 && (
        <StyledSection
          id={t('__TEMPLATES_PAGE_UNGUESS_LIST_TITLE')}
          title={t('__TEMPLATES_PAGE_UNGUESS_LIST_TITLE')}
        >
          <XXL>{t('__TEMPLATES_PAGE_UNGUESS_LIST_TITLE')}</XXL>
          <MD>{t('__TEMPLATES_PAGE_UNGUESS_LIST_SUBTITLE')}</MD>
          <Separator />
          <TemplateCardsGrid templates={templatesByCategory.unguess} />
        </StyledSection>
      )}
    </>
  );
};

export default Body;
