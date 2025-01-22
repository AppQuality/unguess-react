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
import { getSeverityInfo } from 'src/common/components/utils/getSeverityInfo';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { SeverityFilterType } from 'src/features/bugsPage/severityFilter';
import { LabelSpaceBetween, disabledStyle } from './LabelWithCounter';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';

export const SeverityField = ({
  severities,
  maxItemsToShow = 5,
}: {
  severities: SeverityFilterType['severities'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const { counters } = useFilterData('severities');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available, selected } = severities;

  if (!counters) return null;

  return (
    <>
      <AccordionNew
        level={3}
        defaultExpandedSections={[]}
        className="bugs-drawer-accordion-severity"
      >
        <AccordionNew.Section>
          <AccordionNew.Header>
            <AccordionNew.Label
              label={t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_SEVERITY_TITLE')}
              subtitle={
                selected && selected.length
                  ? `${selected
                      .slice(0, maxItemsToShow)
                      .map((item) => item.name)
                      .join(', ')
                      .toLowerCase()} ${
                      selected.length > maxItemsToShow
                        ? `+${selected.length - maxItemsToShow}`
                        : ''
                    }`
                  : t(
                      '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_SEVERITY_ALL_LABEL'
                    )
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
                      className={`bugs-drawer-accordion-severity-item-${item.name.toLowerCase()}`}
                    >
                      <Checkbox
                        value={item.name}
                        name="filter-severity"
                        disabled={!counters[item.id]}
                        checked={selected.map((i) => i.id).includes(item.id)}
                        onChange={() => {
                          dispatch(
                            updateFilters({
                              filters: {
                                severities: [
                                  ...(selected
                                    .map((i) => i.id)
                                    .includes(item.id)
                                    ? selected.filter((i) => i.id !== item.id)
                                    : [...selected, item]),
                                ],
                              },
                            })
                          );
                        }}
                      >
                        <LabelSpaceBetween
                          isRegular
                          style={{
                            color: getSeverityInfo(item.name as Severities, t)
                              .color,
                            ...(!counters[item.id] && disabledStyle),
                          }}
                        >
                          {getSeverityInfo(item.name as Severities, t).text}
                          <MD>{counters[item.id] || 0}</MD>
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
                    i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_SEVERITIES_SHOW_MORE_LABEL"
                    values={{
                      count: available.length - maxItemsToShow,
                    }}
                    components={{
                      Span: <Span isBold />,
                    }}
                    defaults="Show <Span>{{count}}</Span> more severities"
                  />
                ) : (
                  t(
                    '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_SEVERITIES_SHOW_LESS_LABEL'
                  )
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
