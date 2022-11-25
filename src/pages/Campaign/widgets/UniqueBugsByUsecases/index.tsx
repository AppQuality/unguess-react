import {
  theme as globalTheme,
  XL,
  Skeleton,
  Span,
} from '@appquality/unguess-design-system';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import { useUniqueBugsByUsecases } from './useUniqueBugsByUsecases';
import { WidgetCard } from '../WidgetCard';
import { ListItemTable } from '../ListItemTable';

export const UniqueBugsByUsecases = ({
  campaignId,
}: {
  campaignId: number;
}) => {
  const { uniqueBugs, isLoading } = useUniqueBugsByUsecases(campaignId);
  const items = [
    {
      title: 'UC 2. Navigazione sito',
      numerator: 36,
      denominator: 100,
    },
    { title: 'UC 1. Homepage', numerator: 87, denominator: 100 },
    { title: 'UC 4. Check-out', numerator: 33, denominator: 100 },
    { title: 'UC 3. Pagina prodotto', numerator: 69, denominator: 100 },
    { title: 'UC 5. Lista prodotti', numerator: 56, denominator: 137 },
    { title: 'UC 6. Pagina prodotto2', numerator: 37, denominator: 600 },
  ];
  if (isLoading) return <Skeleton />;
  return (
    <WidgetCard>
      <WidgetCard.Header
        tooltipContent={t('__CAMPAIGN_PAGE_UNIQUE_BUGS_BY_USECASES_TOOLTIP')}
      >
        {t('__CAMPAIGN_PAGE_UNIQUE_BUGS_BY_USECASES_TITLE')}
      </WidgetCard.Header>
      <WidgetCard.Description
        header={t('__CAMPAIGN_PAGE_UNIQUE_BUGS_BY_USECASES_TOTAL_LABEL')}
        content={
          <Span style={{ color: globalTheme.palette.blue[600] }}>
            <Trans
              count={uniqueBugs}
              i18nKey="__CAMPAIGN_PAGE_UNIQUE_BUGS_BY_USECASES_COUNT_LABEL"
              components={{ bold: <XL isBold tag="span" /> }}
              defaults="{{count}} <bold>Unique Bugs</bold>"
            />
          </Span>
        }
        footer=""
      />
      <ListItemTable items={items} />
    </WidgetCard>
  );
};
