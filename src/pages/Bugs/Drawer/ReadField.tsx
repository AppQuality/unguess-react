import { Accordion, MD, Radio, SM } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { theme as globalTheme } from 'src/app/theme';
import { Field } from '@zendeskgarden/react-forms';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { Divider } from 'src/common/components/divider';
import { ReadFilterType } from 'src/features/bugsPage/readFilter';
import { useFilterData } from './useFilterData';
import { disabledStyle, LabelSpaceBetween } from './LabelWithCounter';

export const ReadField = ({ read }: { read: ReadFilterType['read'] }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { counters } = useFilterData('read');
  const { available, selected } = read;

  if (!counters) return null;

  return (
    <>
      <Accordion level={3} defaultExpandedSections={[]}>
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label>
              <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
                {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_READ_TITLE')}
              </MD>
              <SM
                style={{
                  color: globalTheme.palette.grey[600],
                  textTransform: 'capitalize',
                }}
              >
                {selected === 'unread'
                  ? t('__BUGS_READ_FILTER_ITEM_UNREAD')
                  : t('__BUGS_READ_FILTER_ITEM_DRAWER_ALL')}
              </SM>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            {available.map((item) => (
              <Field
                style={{
                  marginBottom: globalTheme.space.xxs,
                }}
              >
                <Radio
                  value={item}
                  name="filter-read"
                  disabled={!counters[item as string]}
                  checked={selected && selected === item}
                  onChange={() => {
                    dispatch(
                      updateFilters({
                        filters: {
                          read: item,
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
                    {item === 'unread'
                      ? t('__BUGS_READ_FILTER_ITEM_UNREAD')
                      : t('__BUGS_READ_FILTER_ITEM_ALL')}
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
