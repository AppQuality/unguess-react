import { CounterMultiselect } from '@appquality/unguess-design-system';
import {
  getCurrentCampaignData,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';

export const TagFilter = () => {
  const dispatch = useAppDispatch();
  const data = getCurrentCampaignData();
  const { t } = useTranslation();

  if (
    !data ||
    !data.tags ||
    !data.tags.available ||
    !data.tags.available.length
  )
    return null;

  const options = data.tags.available.map((item) => ({
    itemId: item.tag_id,
    label: item.display_name,
    selected: data.tags.selected.map((i) => i.tag_id).includes(item.tag_id),
  }));

  // Add no tags option
  options.push({
    itemId: 'none',
    label: t('__BUGS_TAGS_FILTER_ITEM_NO_TAGS'),
    selected: data.tags.selected.map((i) => i.tag_id).includes('none'),
  });

  return (
    <div>
      <CounterMultiselect
        isCompact
        i18n={{
          counterText: (count) => t(`Tags ({{count}})`, { count }),
          noItems: t('__BUGS_TAGS_FILTER_ITEM_NO_ITEMS'),
        }}
        onChange={(selected) => {
          dispatch(
            updateFilters({
              filters: {
                tags: selected.map((item) => ({
                  tag_id: item.itemId,
                  display_name: item.label,
                })),
              },
            })
          );

        }}
        options={options}
      />
    </div>
  );
};
