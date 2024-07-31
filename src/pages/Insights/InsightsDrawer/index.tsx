import { useFormikContext } from 'formik';
import { styled } from 'styled-components';
import {
  getColor,
  MD,
  Skeleton,
  SM,
  XL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useGetCampaignsByCidInsightsQuery } from 'src/features/api';
import { ReactComponent as InsightIcon } from '@zendeskgarden/svg-icons/src/16/lightbulb-stroke.svg';
import { useParams } from 'react-router-dom';
import { Divider } from 'src/common/components/divider';
import { useMemo } from 'react';
import { Insight } from './InsightAccordion';
import { InsightFormValues } from '../FormProvider';
import { InsightForm } from './InsightForm';

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
  padding: ${({ theme }) => theme.space.lg};
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid ${getColor(appTheme.colors.neutralHue, 200)};
  border-top: none;

  ${(p) =>
    p.isFetching &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`;

const InsightsDrawer = () => {
  const { campaignId } = useParams();
  const { values } = useFormikContext<InsightFormValues>();
  const { t } = useTranslation();
  const {
    data: insights,
    isFetching,
    isLoading,
    isError,
  } = useGetCampaignsByCidInsightsQuery({
    cid: campaignId || '',
  });

  const publishedInsights = useMemo(
    () => insights?.filter((insight) => insight.visible === 1),
    [insights]
  );

  if (isLoading || isError) return <Skeleton />;

  return (
    <DetailContainer>
      <div
        style={{ paddingTop: appTheme.space.xs, opacity: isFetching ? 0.5 : 1 }}
      >
        {values.id === 0 ? (
          <>
            <XL isBold style={{ marginBottom: appTheme.space.sm }}>
              {values.id === 0 && (
                <InsightIcon style={{ marginRight: appTheme.space.xs }} />
              )}
              {t('__INSIGHTS_PAGE_INSIGHTS_DRAWER_TITLE')}
            </XL>
            {insights && insights.length > 0 && (
              <>
                <Divider />
                <div
                  style={{
                    padding: `${appTheme.space.lg} 0`,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <MD isBold>
                    {t('__INSIGHTS_PAGE_INSIGHTS_DRAWER_PUBLISHED_INSIGHTS')}
                  </MD>
                  <SM
                    color={appTheme.palette.grey[600]}
                    style={{ paddingRight: appTheme.space.md }}
                  >
                    {publishedInsights?.length} su {insights?.length}
                  </SM>
                </div>
              </>
            )}
            {insights &&
              insights.map((insight) => <Insight insight={insight} />)}
          </>
        ) : (
          <InsightForm />
        )}
      </div>
    </DetailContainer>
  );
};

export default InsightsDrawer;
