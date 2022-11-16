import {
  XXXL,
  MD,
  BulletChart,
  Paragraph,
  theme,
  Tag,
  Skeleton,
} from '@appquality/unguess-design-system';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { WidgetCard } from '../WidgetCard';
import { useWidgetData } from './useWidgetData';

export const Progress: FC<{ campaign: Campaign }> = ({ campaign }) => {
  const { t, i18n } = useTranslation();
  const { widgetData, isLoading } = useWidgetData(
    campaign.id,
    t,
    i18n.language
  );

  if (isLoading || !widgetData) {
    return <Skeleton />;
  }

  return (
    <WidgetCard>
      <WidgetCard.Header
        tooltipContent={t('__CAMPAIGN_PAGE_WIDGET_PROGRESS_CARD_TOOLTIP')}
      >
        {t('__CAMPAIGN_PAGE_WIDGET_PROGRESS_CARD_TITLE', 'Stato avanzamento')}
      </WidgetCard.Header>
      <div style={{ marginBottom: theme.space.lg, marginTop: theme.space.lg }}>
        <Paragraph style={{ marginBottom: theme.space.sm, paddingLeft: 10 }}>
          {t(
            '__CAMPAIGN_PAGE_WIDGET_PROGRESS_USECASE_BULLET_TITLE',
            'Completamento Use Case'
          )}
        </Paragraph>
        <BulletChart
          ranges={[25, 50, 75, 100]}
          values={[widgetData.raw.usecase_completion]}
          height="20px"
        />
        <Paragraph
          style={{
            marginBottom: theme.space.sm,
            marginTop: theme.space.md,
            paddingLeft: 10,
          }}
        >
          {t(
            '__CAMPAIGN_PAGE_WIDGET_PROGRESS_TIME_BULLET_TITLE',
            'Tempo trascorso'
          )}
        </Paragraph>
        <BulletChart
          ranges={[25, 50, 75, 100]}
          values={[widgetData.elapsedTimePercentage]}
          height="20px"
        />
      </div>
      <WidgetCard.Description
        header={widgetData.durationLabel}
        content={
          <div style={{ color: theme.palette.blue['600'] }}>
            <XXXL tag="span" isBold>
              {widgetData.timeElapsed}
            </XXXL>
          </div>
        }
        footer={
          <Paragraph>
            <Trans
              i18nkey="__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_FOOTER"
              defaults="su <bold>{{expectedDuration}} stimate</bold>"
              values={{ expectedDuration: widgetData.expectedDuration }}
              components={{ bold: <MD isBold tag="span" /> }}
            />
          </Paragraph>
        }
      />
      <WidgetCard.Footer>
        <Tag>
          {t('__CAMPAIGN_PAGE_WIDGET_PROGRESS_FOOTER', {
            defaultValue: 'Durata test: {{startDate}} a {{endDate}}',
            startDate: widgetData.startDate,
            endDate: widgetData.endDate,
          })}
        </Tag>
      </WidgetCard.Footer>
    </WidgetCard>
  );
};
