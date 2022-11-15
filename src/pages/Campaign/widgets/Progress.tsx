import {
  XL,
  XXXL,
  SM,
  MD,
  BulletChart,
  Paragraph,
  theme,
} from '@appquality/unguess-design-system';
import { Trans, useTranslation } from 'react-i18next';
import { WidgetCard } from './WidgetCard';

export const Progress = () => {
  const { t } = useTranslation();
  return (
    <WidgetCard>
      <WidgetCard.Header tooltipContent="Tooltip content">
        {t('__CAMPAIGN_PAGE_WIDGET_PROGRESS_CARD_TITLE', 'Stato avanzamento')}
      </WidgetCard.Header>
      <div>
        <Paragraph style={{ marginBottom: theme.space.sm, paddingLeft: 10 }}>
          {t(
            '__CAMPAIGN_PAGE_WIDGET_PROGRESS_USECASE_BULLET_TITLE',
            'Completamento Use Case'
          )}
        </Paragraph>
        <BulletChart ranges={[25, 50, 75, 100]} values={[25]} height="20px" />
        <Paragraph style={{ marginBottom: theme.space.sm, paddingLeft: 10 }}>
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
          <span>
            <XXXL tag="span" isBold>
              8{' '}
            </XXXL>
            <XL tag="span" isBold>
              {t(
                '__CAMPAIGN_PAGE_WIDGET_PROGRESS_DESCRIPTION_BUGS',
                'bug unici'
              )}
            </XL>
          </span>
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
        <SM tag="span" isBold>
          {t('__CAMPAIGN_PAGE_WIDGET_PROGRESS_FOOTER', {
            defaultValue: 'Durata test: {{startDate}} a {{endDate}}',
            startDate: '10/04',
            endDate: '12/04/2022',
          })}
        </SM>
      </WidgetCard.Footer>
    </WidgetCard>
  );
};
