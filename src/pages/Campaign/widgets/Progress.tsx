import {
  XL,
  XXXL,
  BulletChart,
  Paragraph,
  theme,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
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
          <span style={{ color: theme.palette.blue[600] }}>
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
        footer="of 100 bugs"
      />
      <WidgetCard.Footer>
        <a href="www.google.com">
          FOOTER LINK<i>my_external_link_icon</i>
        </a>
      </WidgetCard.Footer>
    </WidgetCard>
  );
};
