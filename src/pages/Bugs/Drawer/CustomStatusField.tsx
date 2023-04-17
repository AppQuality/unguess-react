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
import {
  getIsNaBugExcluded,
  setIsNaBugExcluded,
  updateFilters,
} from 'src/features/bugsPage/bugsPageSlice';
import { Divider } from 'src/common/components/divider';
import { CustomStatusFilterType } from 'src/features/bugsPage/customStatusFilter';
import { getCustomStatusInfo } from 'src/common/components/utils/getCustomStatusInfo';
import { getExcludeNotABugInfo } from 'src/common/components/utils/getExcludeNotABugInfo';
import { BugCustomStatus } from 'src/features/api';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';
import { LabelSpaceBetween, disabledStyle } from './LabelWithCounter';

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
  const currentIsNaBugExcluded = getIsNaBugExcluded();

  if (!counters) return null;

  const customStatusNotABugInfo = getExcludeNotABugInfo(t);

  const selectedWithNaB = currentIsNaBugExcluded
    ? [
        ...selected,
        {
          id: customStatusNotABugInfo.actionIdentifier,
          name: customStatusNotABugInfo.drawerTitle,
        },
      ]
    : [...selected];

  const shallDisable = (item: BugCustomStatus): boolean => {
    if (item.id !== customStatusNotABugInfo.customStatusId)
      return !counters[item.id];
    if (currentIsNaBugExcluded) return currentIsNaBugExcluded;
    return !counters[item.id];
  };

  const filterNaBug = (arr: BugCustomStatus[]) =>
    arr.filter(
      (item: BugCustomStatus) =>
        item.id !== customStatusNotABugInfo.customStatusId
    );

  const shouldDisableToggle = !counters[customStatusNotABugInfo.customStatusId];

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
                {selectedWithNaB && selectedWithNaB.length
                  ? `${selectedWithNaB
                      .slice(0, maxItemsToShow)
                      .map((item) =>
                        item.id === customStatusNotABugInfo.actionIdentifier
                          ? customStatusNotABugInfo.drawerTitle
                          : getCustomStatusInfo(item?.name as BugState, t).text
                      )
                      .join(', ')
                      .toLowerCase()} ${
                      selectedWithNaB.length > maxItemsToShow
                        ? `+${selectedWithNaB.length - maxItemsToShow}`
                        : ''
                    }`
                  : t(
                      '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_CUSTOM_STATUS_ALL_LABEL'
                    )}
              </SM>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            <Field style={{ marginBottom: globalTheme.space.md }}>
              <Toggle
                disabled={shouldDisableToggle}
                checked={currentIsNaBugExcluded}
                onChange={(event) => {
                  dispatch(setIsNaBugExcluded(event.target.checked));
                  dispatch(
                    updateFilters({
                      filters: { customStatuses: [...filterNaBug(selected)] },
                    })
                  );
                }}
              >
                <LabelSpaceBetween
                  isRegular
                  style={{
                    color: globalTheme.palette.grey[700],
                    ...(shouldDisableToggle && disabledStyle),
                  }}
                >
                  {customStatusNotABugInfo.drawerTitle}
                  <MD>
                    {counters[customStatusNotABugInfo.customStatusId] || 0}
                  </MD>
                </LabelSpaceBetween>
              </Toggle>
            </Field>
            {available.length
              ? available
                  .slice(0, showMore ? undefined : maxItemsToShow)
                  .map((item) => (
                    <Field style={{ marginBottom: globalTheme.space.xs }}>
                      <Checkbox
                        value={item.name}
                        name="filter-custom-status"
                        disabled={shallDisable(item)}
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
                        <LabelSpaceBetween
                          isRegular
                          style={{
                            color: globalTheme.palette.grey[700],
                            ...(shallDisable(item) && disabledStyle),
                          }}
                        >
                          {getCustomStatusInfo(item?.name as BugState, t).text}
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
