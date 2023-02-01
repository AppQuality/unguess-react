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
import { ReplicabilityFilterType } from 'src/features/bugsPage/replicabilityFilter';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';
import { LabelSpaceBetween } from './LabelWithCounter';

export const ReplicabilityField = ({
  replicabilities,
  maxItemsToShow = 5,
}: {
  replicabilities: ReplicabilityFilterType['replicabilities'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const { counters, loading } = useFilterData('replicabilities');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available, selected } = replicabilities;

  if (loading || !counters) return null;

  return (
    <>
      <Accordion level={3}>
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label>
              <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
                {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_REPLICABILITY_TITLE')}
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
                      .map((item) => item.name)
                      .join(', ')
                      .toLowerCase()} ${
                      selected.length > maxItemsToShow
                        ? `+${selected.length - maxItemsToShow}`
                        : ''
                    }`
                  : t(
                      '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_REPLICABILITY_ALL_LABEL'
                    )}
              </SM>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            {available
              .slice(0, showMore ? undefined : maxItemsToShow)
              .map((replicability) => (
                <Field style={{ marginBottom: globalTheme.space.xs }}>
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
                        color: globalTheme.palette.grey[600],
                        textTransform: 'capitalize',
                      }}
                    >
                      {replicability.name.toLowerCase()}
                      <MD>{counters[replicability.id] || 0}</MD>
                    </LabelSpaceBetween>
                  </Checkbox>
                </Field>
              ))}
            {available.length > maxItemsToShow && (
              <ShowMore
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                {!showMore ? (
                  <Trans i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_REPLICABILITY_SHOW_MORE_LABEL">
                    Show{' '}
                    <Span isBold>
                      {{
                        replicabilities: available.length - maxItemsToShow,
                      }}
                    </Span>{' '}
                    more replicabilities
                  </Trans>
                ) : (
                  t(
                    '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_REPLICABILITY_SHOW_LESS_LABEL'
                  )
                )}
              </ShowMore>
            )}
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
      <Divider />
    </>
  );
};
