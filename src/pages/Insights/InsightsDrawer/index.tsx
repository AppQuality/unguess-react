import { useFormikContext } from 'formik';
import { styled } from 'styled-components';
import { getColor, Skeleton, XL } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useGetCampaignsByCidInsightsQuery } from 'src/features/api';
import { ReactComponent as InsightIcon } from '@zendeskgarden/svg-icons/src/12/lightbulb-stroke.svg';
import { useParams } from 'react-router-dom';
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
  padding: ${({ theme }) => theme.space.md};
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

  if (isLoading || isError) return <Skeleton />;

  return (
    <DetailContainer>
      <div
        style={{ marginTop: appTheme.space.md, opacity: isFetching ? 0.5 : 1 }}
      >
        {values.id === 0 ? (
          <>
            <XL isBold>
              {values.id === 0 && (
                <InsightIcon style={{ marginRight: appTheme.space.md }} />
              )}
              {t('__INSIGHTS_PAGE_INSIGHTS_DRAWER_TITLE')}
            </XL>
            {insights &&
              // insights list
              insights.map((insight) => <Insight insight={insight} />)}
          </>
        ) : (
          // create or update insight
          <InsightForm />
        )}
      </div>
    </DetailContainer>
  );
};

export default InsightsDrawer;
