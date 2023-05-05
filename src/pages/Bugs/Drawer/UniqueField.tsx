import { Accordion, MD, Radio, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { UniqueFilterType } from 'src/features/bugsPage/uniqueFilter';
import { theme as globalTheme } from 'src/app/theme';
import { Field } from '@zendeskgarden/react-forms';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { Divider } from 'src/common/components/divider';
import { useFilterData } from './useFilterData';
import { disabledStyle, LabelSpaceBetween } from './LabelWithCounter';

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
      <Accordion
        level={3}
        defaultExpandedSections={[]}
        className="bugs-drawer-accordion-unique"
      >
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label>
              <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
                {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DUPLICATES_TITLE')}
              </MD>
              <SM
                style={{
                  color: globalTheme.palette.grey[700],
                }}
              >
                {selected === 'unique'
                  ? t('__BUGS_UNIQUE_FILTER_DROWPDOWN_ITEM_UNIQUE')
                  : t('__BUGS_UNIQUE_FILTER_ITEM_PLACEHOLDER')}
              </SM>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            {available.map((item) => (
              <Field
                className={`bugs-drawer-accordion-unique-item-${item.toLocaleLowerCase()}`}
                style={{
                  marginBottom: globalTheme.space.xxs,
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
                      : t('__BUGS_UNIQUE_FILTER_ITEM_PLACEHOLDER')}
                    <MD>{counters[item as string] || 0}</MD>
                  </LabelSpaceBetween>
                </Radio>
              </Field>
            ))}
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
      <Divider />
    </>
  );
};
