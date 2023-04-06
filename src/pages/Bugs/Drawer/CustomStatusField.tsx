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
import { Field, Toggle } from '@zendeskgarden/react-forms';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { Divider } from 'src/common/components/divider';
import { CustomStatusFilterType } from 'src/features/bugsPage/customStatusFilter';
import { getCustomStatusInfo } from 'src/common/components/utils/getCustomStatusInfo';
import styled from 'styled-components';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';
import { LabelSpaceBetween } from './LabelWithCounter';

const Spacer = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.space.md};
`;

export const CustomStatusField = ({
  customStatuses,
  maxItemsToShow = 5,
}: {
  customStatuses: CustomStatusFilterType['customStatuses'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const { counters } = useFilterData('customStatuses');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available: unsorted, selected } = customStatuses;
  const available = [...unsorted].sort((a, b) => a.id - b.id);
  counters[7] = 5;

  if (!counters) return null;

  return (
    <>
      <Accordion level={3} defaultExpandedSections={[]}>
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label>
              <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
                {t(
                  '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_CUSTOM_STATUSE_TITLE'
                )}
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
                    .toLowerCase()} ${selected.length > maxItemsToShow
                      ? `+${selected.length - maxItemsToShow}`
                      : ''
                  }`
                  : t(
                    '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_CUSTOM_STATUS_ALL_LABEL'
                  )}
              </SM>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            <Field>
              <Toggle
                disabled={!counters[7]}
                onChange={(e) => console.log(e)}
              >
                <LabelSpaceBetween isRegular>
                  Exclude “Not a bug”
                  <MD>{counters[7] || 0}</MD>
                </LabelSpaceBetween>
              </Toggle>
            </Field>
            <Spacer />
            {available.length
              ? available
                .slice(0, showMore ? undefined : maxItemsToShow)
                .map((item) => (
                  <Field style={{ marginBottom: globalTheme.space.xs }}>
                    <Checkbox
                      value={item.name}
                      name="filter-priority"
                      disabled={!counters[item.id]}
                      checked={selected.map((i) => i.id).includes(item.id)}
                      onChange={() => {
                        dispatch(
                          updateFilters({
                            filters: {
                              customStatuses: [
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
                      <LabelSpaceBetween isRegular>
                        {
                          getCustomStatusInfo(item?.name as CustomStatus, t)
                            .text
                        }
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
                    i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_CUSTOM_STATUSES_SHOW_MORE_LABEL"
                  >
                    Show{' '}
                    <Span isBold>
                      {{
                        count: available.length - maxItemsToShow,
                      }}
                    </Span>{' '}
                    more statuses
                  </Trans>
                ) : (
                  t(
                    '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_CUSTOM_STATUSES_SHOW_LESS_LABEL'
                  )
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
