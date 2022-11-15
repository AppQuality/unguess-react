import { XL } from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { WidgetCard } from './WidgetCard';

export const Progress = () => (
  <WidgetCard>
    <WidgetCard.Header tooltipContent="Tooltip content">
      {t('__CAMPAIGN_PAGE_UNIQUE_BUGS_TITLE')}
    </WidgetCard.Header>
    <div>HERE MY MAIN CONTENT (e.g. a graph)</div>
    <WidgetCard.Description
      header="Small text on top"
      content={
        <span style={{ color: 'purple' }}>
          8
          <XL tag="span" isBold>
            critical bugs
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
