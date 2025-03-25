import { MD, Separator, XXL } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  CpReqTemplate,
  useGetWorkspacesByWidTemplatesQuery,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import styled from 'styled-components';
import { TemplateCardsGrid } from './TemplateCardsGrid';

const Body = () => {
  const { t } = useTranslation();
  const { activeWorkspace } = useActiveWorkspace();
  const { data, isFetching, isLoading } = useGetWorkspacesByWidTemplatesQuery({
    wid: activeWorkspace?.id.toString() || '',
  });

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

  const filteredTemplates = useMemo(() => {
    if (!data) return { tailored: [], unguess: [] };
    return data.items.reduce<{
      tailored: CpReqTemplate[];
      unguess: CpReqTemplate[];
    }>(
      (acc, template) => {
        if (
          'workspace_id' in template &&
          typeof template.workspace_id === 'number'
        ) {
          acc.tailored.push(template);
        } else {
          acc.unguess.push(template);
        }
        return acc;
      },
      { tailored: [], unguess: [] }
    );
  }, [data]);

  if (!data || isFetching || isLoading) return null;

  return (
    <LayoutWrapper>
      <StyledSection title={t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}>
        <XXL>{t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}</XXL>
        <MD>{t('__TEMPLATES_PAGE_TAILORED_LIST_SUBTITLE')}</MD>
        <Separator />
        <TemplateCardsGrid templates={filteredTemplates.tailored} />
      </StyledSection>
      <StyledSection title={t('__TEMPLATES_PAGE_UNGUESS_LIST_TITLE')}>
        <XXL>{t('__TEMPLATES_PAGE_UNGUESS_LIST_TITLE')}</XXL>
        <MD>{t('__TEMPLATES_PAGE_UNGUESS_LIST_SUBTITLE')}</MD>
        <Separator />
        <TemplateCardsGrid templates={filteredTemplates.unguess} />
      </StyledSection>
    </LayoutWrapper>
  );
};

export default Body;
