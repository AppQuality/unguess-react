import {
  XL,
  BulletChart,
  Span,
  SM,
  Tag,
} from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { BasicWidget } from 'src/pages/Campaign/widgetCards/BasicWidget';
import { useWidgetData } from './useWidgetData';
import { WidgetLoader } from '../widgetLoader';

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Progress: FC<{ campaign: Campaign }> = ({ campaign }) => {
  const height = '140px';
  const { t } = useTranslation();
  const { widgetData, isLoading } = useWidgetData(campaign.id, t);

  return (
    <BasicWidget className="usecase-progress-widget">
      <BasicWidget.Header
        tooltipContent={t(
          '__CAMPAIGN_PAGE_WIDGET_PROGRESS_CARD_TOOLTIP',
          "This widget shows the progress of the campaign's tasks"
        )}
      >
        {t('__CAMPAIGN_PAGE_WIDGET_PROGRESS_CARD_TITLE', 'Stato avanzamento')}
      </BasicWidget.Header>
      {isLoading || !widgetData ? (
        <WidgetLoader />
      ) : (
        <>
          <ChartContainer style={{ height }}>
            <div style={{ width: '100%' }}>
              <SM style={{ marginBottom: appTheme.space.xs }}>
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
                  marginBottom: appTheme.space.xs,
                  marginTop: appTheme.space.md,
                }}
              >
                {t(
                  '__CAMPAIGN_PAGE_WIDGET_PROGRESS_TIME_BULLET_TITLE',
                  'Time passed'
                )}
              </SM>
              <BulletChart
                ranges={[25, 50, 75, 100]}
                values={[widgetData.elapsedTimePercentage || 0]}
                height="15px"
                width="60%"
              />
            </div>
          </ChartContainer>
          <BasicWidget.Description
            header={widgetData.durationLabel}
            content={
              <div style={{ color: appTheme.palette.blue['600'] }}>
                {widgetData.duration.value}{' '}
                <XL
                  tag="span"
                  isBold
                  color={appTheme.components.text.primaryColor}
                >
                  {widgetData.duration.unit}
                </XL>
              </div>
            }
            footer={
              widgetData.expectedDuration ? (
                <Trans
                  i18nKey="__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_FOOTER"
                  components={{
                    bold: (
                      <Span
                        color={appTheme.components.text.primaryColor}
                        isBold
                      />
                    ),
                  }}
                  defaults="over <bold>{{ expectedDuration }}</bold> expected"
                  values={{
                    expectedDuration: `${widgetData.expectedDuration.value} ${widgetData.expectedDuration.unit}`,
                  }}
                />
              ) : null
            }
          />
          <BasicWidget.Footer>
            <Tag>
              {t('__CAMPAIGN_PAGE_WIDGET_PROGRESS_FOOTER', {
                defaultValue: 'Test duration: {{startDate}} to {{endDate}}',
                startDate: widgetData.startDate,
                endDate: widgetData.endDate,
              })}
            </Tag>
          </BasicWidget.Footer>
        </>
      )}
    </BasicWidget>
  );
};
