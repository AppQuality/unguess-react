import {
  AccordionNew,
  Checkbox,
  FormField as Field,
  MD,
  Span,
  TextDescription,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { OsFilterType } from 'src/features/bugsPage/osFilter';
import { LabelSpaceBetween, disabledStyle } from './LabelWithCounter';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';

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
      <AccordionNew
        level={3}
        defaultExpandedSections={[]}
        className="bugs-drawer-accordion-os"
        isCompact
      >
        <AccordionNew.Section>
          <AccordionNew.Header>
            <AccordionNew.Label
              label={t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_OS_TITLE')}
              subtitle={
                selected && selected.length
                  ? `${selected
                      .slice(0, maxItemsToShow)
                      .map((item) => item.os)
                      .join(', ')
                      .toLowerCase()} ${
                      selected.length > maxItemsToShow
                        ? `+${selected.length - maxItemsToShow}`
                        : ''
                    }`
                  : t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_OS_ALL_LABEL')
              }
            />
          </AccordionNew.Header>
          <AccordionNew.Panel>
            {available.length
              ? available
                  .slice(0, showMore ? undefined : maxItemsToShow)
                  .map((item) => (
                    <Field
                      style={{ marginBottom: appTheme.space.xs }}
                      className="bugs-drawer-accordion-os-item"
                    >
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
                            color: appTheme.palette.grey[700],
                            ...(!counters[item.os] && disabledStyle),
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
                    values={{
                      count: available.length - maxItemsToShow,
                    }}
                    components={{
                      span: <Span isBold />,
                    }}
                    default="Show <span>{{ count }}</span> more OS"
                  />
                ) : (
                  t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_OS_SHOW_LESS_LABEL')
                )}
              </ShowMore>
            ) : null}
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
      <Divider />
    </>
  );
};
