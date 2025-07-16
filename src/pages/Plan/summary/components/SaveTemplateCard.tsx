import {
  Button,
  ContainerCard,
  MD,
  UnorderedList,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useGetWorkspacesByWidTemplatesQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import styled from 'styled-components';
import { usePlanContext } from '../../context/planContext';
import { ReactComponent as ApprovedImage } from '../assets/saveTemplate.svg';
import { Title } from './typography/Title';

const ImageItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;

const ContentRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
`;

export const SaveTemplateCard = () => {
  const { t } = useTranslation();
  const { setIsSaveTemplateModalOpen } = usePlanContext();
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();

  const { data } = useGetWorkspacesByWidTemplatesQuery({
    wid: activeWorkspace?.id.toString() || '',
    filterBy: {
      sourcePlan: planId || '',
    },
  });

  const templateFromPlan = data?.items || [];

  return (
    <ContainerCard data-qa="save-template-card">
      <ContentRow>
        <ImageItem>
          <ApprovedImage />
        </ImageItem>
        <ContentItem>
          <div style={{ marginBottom: appTheme.space.lg }}>
            <Title
              style={{
                marginBottom: appTheme.space.xs,
              }}
            >
              {t('__PLAN_PAGE_SUMMARY_TAB_SAVE_TEMPLATE_CARD_TITLE')}
            </Title>
            <MD>
              {t('__PLAN_PAGE_SUMMARY_TAB_SAVE_TEMPLATE_CARD_DESCRIPTION')}
            </MD>
            {templateFromPlan.length > 0 && (
              <>
                <MD
                  isBold
                  color={appTheme.palette.grey[700]}
                  style={{
                    marginTop: appTheme.space.md,
                    marginBottom: appTheme.space.sm,
                  }}
                >
                  {t(
                    '__PLAN_PAGE_SUMMARY_TAB_SAVE_TEMPLATE_TEMPLATE_LIST_TITLE'
                  )}
                </MD>
                <UnorderedList>
                  {templateFromPlan.slice(0, 3).map((template) => (
                    <UnorderedList.Item key={template.id}>
                      {template.name}
                    </UnorderedList.Item>
                  ))}
                </UnorderedList>
                {templateFromPlan.length > 3 && (
                  <MD style={{ marginTop: appTheme.space.sm }}>
                    {t(
                      '__PLAN_PAGE_SUMMARY_TAB_SAVE_TEMPLATE_TEMPLATE_LIST_MORE',
                      {
                        count: templateFromPlan.length - 3,
                      }
                    )}
                  </MD>
                )}
              </>
            )}
          </div>

          <Button onClick={() => setIsSaveTemplateModalOpen(true)}>
            {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_SAVE_TEMPLATE_CTA')}
          </Button>
        </ContentItem>
      </ContentRow>
    </ContainerCard>
  );
};
