import { useFormikContext } from 'formik';
import { styled } from 'styled-components';
import {
  getColor,
  MD,
  Skeleton,
  SM,
  Span,
  XL,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useGetCampaignsByCidInsightsQuery } from 'src/features/api';
import { ReactComponent as InsightIcon } from '@zendeskgarden/svg-icons/src/16/lightbulb-stroke.svg';
import { ReactComponent as EmptyInsights } from 'src/assets/empty-insights.svg';
import { useParams } from 'react-router-dom';
import { Divider } from 'src/common/components/divider';
import { useEffect, useMemo, useRef } from 'react';
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
  height: 100%;
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
  const ref = useRef<HTMLDivElement>(null);

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

  // Reset drawer scroll on editing mode change
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0;
    }
  }, [values.id]);

  if (isLoading || isError) return <Skeleton />;

  return (
    <DetailContainer
      ref={ref}
      data-qa="insight-drawer"
      role="list"
      aria-labelledby="drawer-title"
    >
      <div
        style={{ paddingTop: appTheme.space.xs, opacity: isFetching ? 0.5 : 1 }}
      >
        {values.id === 0 ? (
          <>
            <XL isBold style={{ marginBottom: appTheme.space.md }}>
              {values.id === 0 && (
                <InsightIcon
                  color={appTheme.palette.grey[600]}
                  style={{ marginRight: appTheme.space.xs }}
                />
              )}
              <span id="drawer-title">
                {t('__INSIGHTS_PAGE_INSIGHTS_DRAWER_TITLE')}
              </span>
            </XL>
            <Divider />
            {insights && insights.length > 0 ? (
              <>
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
                    <Trans
                      i18nKey="__INSIGHTS_PAGE_INSIGHTS_DRAWER_PUBLISHED_INSIGHTS_COUNTER"
                      components={{
                        Span: <Span isBold />,
                      }}
                      values={{
                        published: publishedInsights?.length || 0,
                        total: insights?.length || 0,
                      }}
                      defaults="<span>{{published}}</span> out of <span>{{total}}</span>"
                    />
                  </SM>
                </div>
                {insights.map((insight) => (
                  <Insight insight={insight} />
                ))}
              </>
            ) : (
              <>
                <EmptyInsights style={{ marginTop: appTheme.space.lg }} />
                <XL
                  isBold
                  style={{
                    marginTop: appTheme.space.lg,
                    marginBottom: appTheme.space.xs,
                  }}
                >
                  {t('__INSIGHTS_PAGE_INSIGHTS_DRAWER_NO_INSIGHTS')}
                </XL>
                <MD>
                  {t('__INSIGHTS_PAGE_INSIGHTS_DRAWER_NO_INSIGHTS_DESCRIPTION')}
                </MD>
              </>
            )}
          </>
        ) : (
          <InsightForm />
        )}
      </div>
    </DetailContainer>
  );
};

export default InsightsDrawer;
