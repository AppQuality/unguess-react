import { CounterMultiselect } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getSeverityInfo } from 'src/common/components/utils/getSeverityInfo';

import { setUseCase } from 'src/features/uxFiltersFake/campaignsFilterSlice';

import { clusters } from '../fakeData';
import { getSeverity } from '../utils';
import { useCampaignInsights } from '../useCampaignInsights';

export const UseCaseFilter = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { usecase: selectedUseCase } = useAppSelector(
    (state) => state.uxFilters
  );

  const { data, isLoading, isError } = useCampaignInsights({
    campaignId: '6149',
  });
  // reduce clusters into an array of clusters

  const available = data.findings.map((item) => item.cluster).flat(1);
  console.log('findings', data.findings);
  console.log('available', available);

  return (
    <div style={{ maxWidth: '170px' }} className="dropdown-severities">
      <CounterMultiselect
        isCompact
        i18n={{
          counterText: (count) => t(`UseCase ({{count}})`, { count }),
          noItems: t('__BUGS_USECASES_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          dispatch(
            setUseCase(
              selected.map((item) => ({
                id: item.itemId,
                name: item.label,
              }))
            )
          );
        }}
        options={clusters.map((item) => ({
          itemId: item.id,
          className: `dropdown-usecase-item-${item.name.toLowerCase()}`,
          label: `${item.name} ${
            !available.some((i) => i.id === item.id) ? '(0)' : ''
          }`,
          style: {
            color: getSeverityInfo(getSeverity(item) as Severities, t).color,
          },
          disabled: !available.some((i) => i.id === item.id),
          selected: selectedUseCase.some((i) => i.id === item.id),
        }))}
      />
    </div>
  );
};
