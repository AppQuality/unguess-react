import { useFormikContext } from 'formik';
import { styled } from 'styled-components';
import {
  IconButton,
  LG,
  Skeleton,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { useGetCampaignsByCidInsightsQuery } from 'src/features/api';
import { useParams } from 'react-router-dom';
import { Insight } from './Insight';
import { InsightFormValues } from './FormProvider';
import { useInsightContext } from './InsightContext';
import { InsightForm } from './InsightForm';
import { NewInsightForm } from './NewInsight';

const DetailContainer = styled.div<{
  isFetching?: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  width: 100%;
  background-color: white;
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  padding: ${({ theme }) => theme.space.md};
  overflow-y: auto;
  overflow-x: hidden;

  ${(p) =>
    p.isFetching &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`;

const InsightsDrawer = () => {
  const { campaignId } = useParams();
  const { values, resetForm } = useFormikContext<InsightFormValues>();
  const { t } = useTranslation();
  const { setIsDrawerOpen } = useInsightContext();
  const {
    data: insights,
    isFetching,
    isLoading,
    isError,
  } = useGetCampaignsByCidInsightsQuery({
    cid: campaignId || '',
  });

  if (isLoading || isError) return <Skeleton />;

  return (
    <DetailContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <LG isBold>{t('__INSIGHTS_PAGE_INSIGHTS_DRAWER_TITLE')}</LG>
        <Tooltip
          content={t('__BUGS_PAGE_CLOSE_DETAILS_TOOLTIP')}
          size="large"
          type="light"
          placement="auto"
        >
          <IconButton
            size="small"
            onClick={() => {
              setIsDrawerOpen(false);
              if (values.id === -1) {
                resetForm();
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div
        style={{ marginTop: appTheme.space.md, opacity: isFetching ? 0.5 : 1 }}
      >
        {values.id === 0 &&
          insights &&
          // accordion
          insights.map((insight) => <Insight insight={insight} />)}
        {values.id === -1 && (
          // new insight
          <NewInsightForm />
        )}
        {values.id > 0 && (
          // edit insight
          <InsightForm />
        )}
      </div>
    </DetailContainer>
  );
};

export { InsightsDrawer };
