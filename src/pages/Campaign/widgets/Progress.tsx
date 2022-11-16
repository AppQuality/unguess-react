import {
  XXXL,
  MD,
  BulletChart,
  Paragraph,
  theme,
  Tag,
} from '@appquality/unguess-design-system';
import { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Campaign } from 'src/features/api';
import { WidgetCard } from './WidgetCard';

export const Progress: FC<{ campaign: Campaign }> = ({ campaign }) => {
  const { t, i18n } = useTranslation();
  const getCampaignDurationLabel = () => {
    const endDate = new Date(campaign.end_date);
    const today = new Date();
    return today > endDate
      ? t(
          '__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_HEADER_FINISHED',
          'Durata campagna:'
        )
      : t(
          '__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_HEADER_ACTIVE',
          'Campagna attiva da:'
        );
  };
  const getCampaignDurationTime = () => {
    const startDate = new Date(campaign.start_date);
    const today = new Date();
    const diff = (today.getTime() - startDate.getTime()) / (1000 * 60 * 60); // hours

    return diff <= 72
      ? `${diff} ${t('hours', 'ore')}`
      : `${Math.round(diff / 24)} ${t('days', 'giorni')}`;
  };

  const getCampaignEstimatedTime = () => {
    const startDate = new Date(campaign.start_date);
    const endDate = new Date(campaign.end_date);
    const diff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60); // hours
    return diff <= 72
      ? `${Math.round(diff)} ${t('hours', 'ore')}`
      : `${Math.round(diff / 24)} ${t('days', 'giorni')}`;
  };

  const getFormattedStartDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'numeric',
      day: 'numeric',
    };
    if (
      new Date(campaign.end_date).getFullYear() !==
      new Date(campaign.start_date).getFullYear()
    ) {
      options.year = 'numeric';
    }
    return new Date(campaign.start_date).toLocaleDateString(
      i18n.language,
      options
    );
  };

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
        <BulletChart ranges={[25, 50, 75, 100]} values={[25]} height="20px" />
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
        <BulletChart ranges={[25, 50, 75, 100]} values={[75]} height="20px" />
      </div>
      <WidgetCard.Description
        header={getCampaignDurationLabel()}
        content={
          <div style={{ color: theme.palette.blue['600'] }}>
            <XXXL tag="span" isBold>
              {getCampaignDurationTime()}
            </XXXL>
          </div>
        }
        footer={
          <Paragraph>
            <Trans
              i18nkey="__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_FOOTER"
              defaults="su <bold>{{estimatedTime}} stimate</bold>"
              values={{ estimatedTime: getCampaignEstimatedTime() }}
              components={{ bold: <MD isBold tag="span" /> }}
            />
          </Paragraph>
        }
      />
      <WidgetCard.Footer>
        <Tag>
          {t('__CAMPAIGN_PAGE_WIDGET_PROGRESS_FOOTER', {
            defaultValue: 'Durata test: {{startDate}} a {{endDate}}',
            startDate: getFormattedStartDate(),
            endDate: new Date(campaign.end_date).toLocaleDateString(
              i18n.language,
              { month: 'numeric', day: 'numeric', year: 'numeric' }
            ),
          })}
        </Tag>
      </WidgetCard.Footer>
    </WidgetCard>
  );
};
