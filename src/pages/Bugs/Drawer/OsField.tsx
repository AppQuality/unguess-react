import {
  Accordion,
  Checkbox,
  MD,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { theme as globalTheme } from 'src/app/theme';
import { Field } from '@zendeskgarden/react-forms';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { Divider } from 'src/common/components/divider';
import { OsFilterType } from 'src/features/bugsPage/osFilter';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';
import { LabelSpaceBetween } from './LabelWithCounter';

export const OsField = ({
  os,
  maxItemsToShow = 5,
}: {
  os: OsFilterType['os'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const { counters } = useFilterData('os');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available, selected } = os;

  if (!counters) return null;

  return (
    <>
      <Accordion level={3} defaultExpandedSections={[]}>
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label>
              <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
                {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_OS_TITLE')}
              </MD>
              <SM
                style={{
                  color: globalTheme.palette.grey[600],
                  textTransform: 'capitalize',
                }}
              >
                {selected && selected.length
                  ? `${selected
                      .slice(0, maxItemsToShow)
                      .map((item) => item.os)
                      .join(', ')
                      .toLowerCase()} ${
                      selected.length > maxItemsToShow
                        ? `+${selected.length - maxItemsToShow}`
                        : ''
                    }`
                  : t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_OS_ALL_LABEL')}
              </SM>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            {available.length
              ? available
                  .slice(0, showMore ? undefined : maxItemsToShow)
                  .map((item) => (
                    <Field style={{ marginBottom: globalTheme.space.xs }}>
                      <Checkbox
                        value={item.os}
                        name="filter-os"
                        disabled={!counters[item.os]}
                        checked={selected.map((i) => i.os).includes(item.os)}
                        onChange={() => {
                          dispatch(
                            updateFilters({
                              filters: {
                                os: [
                                  ...(selected
                                    .map((i) => i.os)
                                    .includes(item.os)
                                    ? selected.filter((i) => i.os !== item.os)
                                    : [
                                        ...selected,
                                        {
                                          os: item.os,
                                        },
                                      ]),
                                ],
                              },
                            })
                          );
                        }}
                      >
                        <LabelSpaceBetween
                          isRegular
                          style={{
                            color: globalTheme.palette.grey[600],
                          }}
                        >
                          {item.os}
                          <MD>{counters[item.os] || 0}</MD>
                        </LabelSpaceBetween>
                      </Checkbox>
                    </Field>
                  ))
              : null}
            {available.length > maxItemsToShow ? (
              <ShowMore
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                {!showMore ? (
                  <Trans
                    count={available.length - maxItemsToShow}
                    i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_OS_SHOW_MORE_LABEL"
                  >
                    Show{' '}
                    <Span isBold>
                      {{
                        count: available.length - maxItemsToShow,
                      }}
                    </Span>{' '}
                    more OS
                  </Trans>
                ) : (
                  t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_OS_SHOW_LESS_LABEL')
                )}
              </ShowMore>
            ) : null}
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
      <Divider />
    </>
  );
};
