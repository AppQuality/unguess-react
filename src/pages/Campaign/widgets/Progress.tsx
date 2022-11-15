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
        header={t(
          '__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_HEADER',
          'Campagna attiva da:'
        )}
        content={
          <div style={{ color: theme.palette.blue['600'] }}>
            <XXXL tag="span" isBold>
              72 {t('hours', 'ore')}
            </XXXL>
          </div>
        }
        footer={
          <Paragraph>
            <Trans
              i18nkey="__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_FOOTER"
              defaults="su <bold>{{estimatedTime}} stimate</bold>"
              values={{ estimatedTime: '72h' }}
              components={{ bold: <MD isBold tag="span" /> }}
            />
          </Paragraph>
        }
      />
      <WidgetCard.Footer>
        <Tag>
          {t('__CAMPAIGN_PAGE_WIDGET_PROGRESS_FOOTER', {
            defaultValue: 'Durata test: {{startDate}} a {{endDate}}',
            startDate: new Date(campaign.start_date).toLocaleDateString(
              i18n.language,
              { month: 'numeric', day: 'numeric' }
            ),
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
