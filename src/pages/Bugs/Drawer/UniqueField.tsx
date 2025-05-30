import {
  AccordionNew,
  FormField as Field,
  MD,
  Radio,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { UniqueFilterType } from 'src/features/bugsPage/uniqueFilter';
import { LabelSpaceBetween, disabledStyle } from './LabelWithCounter';
import { useFilterData } from './useFilterData';

export const UniqueField = ({
  unique,
}: {
  unique: UniqueFilterType['unique'];
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { counters } = useFilterData('unique');
  const { available, selected } = unique;

  if (!counters) return null;

  return (
    <>
      <AccordionNew
        level={3}
        defaultExpandedSections={[]}
        className="bugs-drawer-accordion-unique"
        isCompact
      >
        <AccordionNew.Section>
          <AccordionNew.Header>
            <AccordionNew.Label
              label={t(
                '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DUPLICATES_TITLE'
              )}
              subtitle={
                selected === 'unique'
                  ? t('__BUGS_UNIQUE_FILTER_DROWPDOWN_ITEM_UNIQUE')
                  : t('__BUGS_UNIQUE_FILTER_ITEM_PLACEHOLDER')
              }
            />
          </AccordionNew.Header>
          <AccordionNew.Panel>
            {available.map((item) => (
              <Field
                className={`bugs-drawer-accordion-unique-item-${item.toLowerCase()}`}
                style={{
                  marginBottom: appTheme.space.xxs,
                }}
              >
                <Radio
                  value={item}
                  name="filter-duplicates"
                  disabled={!counters[item as string]}
                  checked={selected && selected === item}
                  onChange={() => {
                    dispatch(
                      updateFilters({
                        filters: {
                          unique: item,
                        },
                      })
                    );
                  }}
                >
                  <LabelSpaceBetween
                    isRegular
                    style={{
                      textTransform: 'capitalize',
                      ...(!counters[item as string] && disabledStyle),
                    }}
                  >
                    {item === 'unique'
                      ? t('__BUGS_UNIQUE_FILTER_ITEM_UNIQUE')
                      : t('__BUGS_UNIQUE_FILTER_ITEM_ALL')}
                    <MD>{counters[item as string] || 0}</MD>
                  </LabelSpaceBetween>
                </Radio>
              </Field>
            ))}
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
      <Divider />
    </>
  );
};
