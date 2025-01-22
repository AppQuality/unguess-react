import {
  AccordionNew,
  Checkbox,
  FormField as Field,
  MD,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { ReplicabilityFilterType } from 'src/features/bugsPage/replicabilityFilter';
import { LabelSpaceBetween, disabledStyle } from './LabelWithCounter';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';

export const ReplicabilityField = ({
  replicabilities,
  maxItemsToShow = 5,
}: {
  replicabilities: ReplicabilityFilterType['replicabilities'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const { counters } = useFilterData('replicabilities');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available, selected } = replicabilities;

  if (!counters) return null;

  return (
    <>
      <AccordionNew
        level={3}
        defaultExpandedSections={[]}
        className="bugs-drawer-accordion-replicability"
        isCompact
      >
        <AccordionNew.Section>
          <AccordionNew.Header>
            <AccordionNew.Label
              label={t(
                '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_REPLICABILITY_TITLE'
              )}
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
                      '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_REPLICABILITY_ALL_LABEL'
                    )
              }
            />
          </AccordionNew.Header>
          <AccordionNew.Panel>
            {available.length
              ? available
                  .slice(0, showMore ? undefined : maxItemsToShow)
                  .map((replicability) => (
                    <Field
                      style={{ marginBottom: appTheme.space.xs }}
                      className={`bugs-drawer-accordion-replicability-${replicability.name.toLowerCase()}`}
                    >
                      <Checkbox
                        value={replicability.id}
                        name="filter-replicability"
                        disabled={!counters[replicability.id]}
                        checked={selected
                          .map((i) => i.id)
                          .includes(replicability.id)}
                        onChange={() => {
                          dispatch(
                            updateFilters({
                              filters: {
                                replicabilities: [
                                  ...(selected
                                    .map((i) => i.id)
                                    .includes(replicability.id)
                                    ? selected.filter(
                                        (i) => i.id !== replicability.id
                                      )
                                    : [...selected, replicability]),
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
                            textTransform: 'capitalize',
                            ...(!counters[replicability.id] && disabledStyle),
                          }}
                        >
                          {replicability.name.toLowerCase()}
                          <MD>{counters[replicability.id] || 0}</MD>
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
                    i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_REPLICABILITY_SHOW_MORE_LABEL"
                    values={{
                      count: available.length - maxItemsToShow,
                    }}
                    components={{
                      span: <Span isBold />,
                    }}
                    default="Show <span>{{count}}</span> more replicabilities"
                  />
                ) : (
                  t(
                    '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_REPLICABILITY_SHOW_LESS_LABEL'
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
