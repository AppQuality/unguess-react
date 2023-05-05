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
import { PriorityFilterType } from 'src/features/bugsPage/priorityFilter';
import { getPriorityInfo } from 'src/common/components/utils/getPriorityInfo';
import styled from 'styled-components';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';
import { LabelSpaceBetween, disabledStyle } from './LabelWithCounter';

const CenterAlignedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

export const PriorityField = ({
  priorities,
  maxItemsToShow = 5,
}: {
  priorities: PriorityFilterType['priorities'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const { counters } = useFilterData('priorities');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available, selected } = priorities;

  if (!counters) return null;

  return (
    <>
      <Accordion
        level={3}
        defaultExpandedSections={[]}
        className="bugs-drawer-accordion-custom-priority"
      >
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label>
              <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
                {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_PRIORITY_TITLE')}
              </MD>
              <SM
                style={{
                  color: globalTheme.palette.grey[700],
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
                      '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_PRIORITY_ALL_LABEL'
                    )}
              </SM>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            {available.length
              ? available
                  .slice(0, showMore ? undefined : maxItemsToShow)
                  .map((item) => (
                    <Field
                      style={{ marginBottom: globalTheme.space.xs }}
                      className={`bugs-drawer-accordion-custom-priority-${item.name.toLowerCase()}`}
                    >
                      <Checkbox
                        value={item.name}
                        name="filter-priority"
                        disabled={!counters[item.id]}
                        checked={selected.map((i) => i.id).includes(item.id)}
                        onChange={() => {
                          dispatch(
                            updateFilters({
                              filters: {
                                priorities: [
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
                            color: globalTheme.palette.grey[700],
                            ...(!counters[item.id] && disabledStyle),
                          }}
                        >
                          <CenterAlignedDiv>
                            {getPriorityInfo(item?.name as Priority, t).icon}
                            {getPriorityInfo(item?.name as Priority, t).text}
                          </CenterAlignedDiv>
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
                    i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_PRIORITIES_SHOW_MORE_LABEL"
                  >
                    Show{' '}
                    <Span isBold>
                      {{
                        count: available.length - maxItemsToShow,
                      }}
                    </Span>{' '}
                    more priorities
                  </Trans>
                ) : (
                  t(
                    '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_PRIORITIES_SHOW_LESS_LABEL'
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
