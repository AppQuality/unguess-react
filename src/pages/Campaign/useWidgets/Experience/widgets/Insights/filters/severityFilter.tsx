import { CounterMultiselect } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getSeverityInfo } from 'src/common/components/utils/getSeverityInfo';

import { setSeverity } from 'src/features/uxFiltersFake/campaignsFilterSlice';
import { getSeverity } from '../utils';
import { useCampaignInsights } from '../useCampaignInsights';

const severities = [
  { id: 1, name: 'Minor' },
  { id: 2, name: 'Major' },
  { id: 3, name: 'Positive' },
  { id: 4, name: 'Observation' },
];

export const SeverityFilter = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { severity: selectedSeverity } = useAppSelector(
    (state) => state.uxFilters
  );

  const { data, isLoading, isError } = useCampaignInsights({
    campaignId: '6149',
    filterBy: 'usecase',
  });
  const available = data.findings.map((item) => item.severity);

  return (
    <div style={{ maxWidth: '170px' }} className="dropdown-severities">
      <CounterMultiselect
        isCompact
        i18n={{
          counterText: (count) => t(`Severity ({{count}})`, { count }),
          noItems: t('__BUGS_SEVERITY_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          dispatch(
            setSeverity(
              selected.map((item) => ({
                id: item.itemId,
                name: item.label,
              }))
            )
          );
        }}
        options={severities.map((item) => ({
          itemId: item.id,
          className: `dropdown-severities-item-${item.name.toLowerCase()}`,
          label: `${item.name} ${
            !available.some((i) => i.id === item.id) ? '(0)' : ''
          }`,
          style: {
            color: getSeverityInfo(getSeverity(item) as Severities, t).color,
          },
          disabled:
            !selectedSeverity.some((i) => i.id === item.id) &&
            !available.some((i) => i.id === item.id),
          selected: selectedSeverity.some((i) => i.id === item.id),
        }))}
      />
    </div>
  );
};
