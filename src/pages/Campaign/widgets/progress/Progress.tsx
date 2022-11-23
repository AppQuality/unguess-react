import {
  XL,
  MD,
  BulletChart,
  Paragraph,
  theme,
  Tag,
  Skeleton,
  SM,
} from '@appquality/unguess-design-system';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import styled from 'styled-components';
import { WidgetCard } from '../WidgetCard';
import { useWidgetData } from './useWidgetData';

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Progress: FC<{ campaign: Campaign }> = ({ campaign }) => {
  const height = '140px';
  const { t } = useTranslation();
  const { widgetData, isLoading } = useWidgetData(campaign.id, t);

  if (isLoading || !widgetData) {
    return <Skeleton />;
  }

  return (
    <WidgetCard>
      <WidgetCard.Header
        tooltipContent={t(
          '__CAMPAIGN_PAGE_WIDGET_PROGRESS_CARD_TOOLTIP',
          "This widget shows the progress of the campaign's tasks"
        )}
      >
        {t('__CAMPAIGN_PAGE_WIDGET_PROGRESS_CARD_TITLE', 'Stato avanzamento')}
      </WidgetCard.Header>
      <ChartContainer style={{ height }}>
        <div style={{ width: '100%' }}>
          <SM style={{ marginBottom: theme.space.xs }}>
            {t(
              '__CAMPAIGN_PAGE_WIDGET_PROGRESS_USECASE_BULLET_TITLE',
              'Use Case completion'
            )}
          </SM>
          <BulletChart
            ranges={[25, 50, 75, 100]}
            values={[widgetData.raw.usecase_completion]}
            height="15px"
            width="60%"
          />
          <SM
            style={{
              marginBottom: theme.space.xs,
              marginTop: theme.space.md,
            }}
          >
            {t(
              '__CAMPAIGN_PAGE_WIDGET_PROGRESS_TIME_BULLET_TITLE',
              'Time passed'
            )}
          </SM>
          <BulletChart
            ranges={[25, 50, 75, 100]}
            values={[widgetData.elapsedTimePercentage]}
            height="15px"
            width="60%"
          />
        </div>
      </ChartContainer>
      <WidgetCard.Description
        header={widgetData.durationLabel}
        content={
          <div style={{ color: theme.palette.blue['600'] }}>
            {widgetData.duration.value}{' '}
            <XL tag="span" isBold>
              {widgetData.duration.unit}
            </XL>
          </div>
        }
        footer={
          widgetData.expectedDuration ? (
            <Paragraph>
              <Trans
                i18nkey="__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_FOOTER"
                defaults="over <bold>{{expectedDuration}} expected</bold>"
                values={{
                  expectedDuration: `${widgetData.expectedDuration.value} ${widgetData.expectedDuration.unit}`,
                }}
                components={{ bold: <MD isBold tag="span" /> }}
              />
            </Paragraph>
          ) : null
        }
      />
      <WidgetCard.Footer>
        <Tag isPill>
          {t('__CAMPAIGN_PAGE_WIDGET_PROGRESS_FOOTER', {
            defaultValue: 'Test duration: {{startDate}} to {{endDate}}',
            startDate: widgetData.startDate,
            endDate: widgetData.endDate,
          })}
        </Tag>
      </WidgetCard.Footer>
    </WidgetCard>
  );
};
