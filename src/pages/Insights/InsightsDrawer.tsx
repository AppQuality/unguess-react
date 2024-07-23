import { useFormikContext } from 'formik';
import { styled } from 'styled-components';
import { IconButton, LG, Tooltip } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { Insight } from './Insight';
import { InsightFormValues } from './FormProvider';
import { useInsightContext } from './InsightContext';
import { InsightForm } from './InsightForm';
import { NewInsight } from './NewInsight';

const insightData = [
  {
    id: 1,
    title: 'Insight #1',
    severity: 1,
    observations: [
      {
        id: 1,
        title: 'Observation #1',
        severity: 1,
        quotes: '',
      },
    ],
  },
  {
    id: 2,
    title: 'Insight #2',
    severity: 1,
    observations: [],
  },
];

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

  ${(p) =>
    p.isFetching &&
    `
    opacity: 0.5;
    pointer-events: none;
  `}
`;

const InsightsDrawer = () => {
  const { values } = useFormikContext<InsightFormValues>();
  const { t } = useTranslation();
  const { setIsDrawerOpen } = useInsightContext();

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
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div style={{ marginTop: appTheme.space.md }}>
        {values.id === 0 &&
          // accordion
          insightData.map((insight) => <Insight insight={insight} />)}
        {values.id === -1 && (
          // new insight
          <NewInsight
            insight={{
              id: -1,
              title: 'New Insight',
              severity: 1,
              observations: values.observations,
            }}
          />
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
