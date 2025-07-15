import { Button, ContainerCard, MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { usePlanContext } from '../../context/planContext';
import { ReactComponent as ApprovedImage } from '../assets/saveTemplate.svg';
import { Title } from './typography/Title';

const ImageItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

  return (
    <ContainerCard>
      <ContentRow>
        <ImageItem>
          <ApprovedImage />
        </ImageItem>
        <ContentItem>
          <Title
            style={{
              marginBottom: appTheme.space.xs,
            }}
          >
            {t('__PLAN_PAGE_SUMMARY_TAB_SAVE_TEMPLATE_CARD_TITLE')}
          </Title>
          <MD style={{ marginBottom: appTheme.space.lg }}>
            {t('__PLAN_PAGE_SUMMARY_TAB_SAVE_TEMPLATE_CARD_DESCRIPTION')}
          </MD>

          <Button onClick={() => setIsSaveTemplateModalOpen(true)}>
            {t('__PLAN_PAGE_SUMMARY_TAB_CONFIRMATION_CARD_SAVE_TEMPLATE_CTA')}
          </Button>
        </ContentItem>
      </ContentRow>
    </ContainerCard>
  );
};
