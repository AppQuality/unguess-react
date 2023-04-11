import { Accordion, MD } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { getSelectedFilters } from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { getCustomStatusInfo } from 'src/common/components/utils/getCustomStatusInfo';
import { EmptyState } from './components/EmptyState';
import BugStateAccordion from './components/BugStateAccordion';
import { BugByStateType } from './types';
import { EmptyGroup } from './components/EmptyGroup';

export const BugsByState = ({
  campaignId,
  bugsByStates,
}: {
  campaignId: number;
  bugsByStates: BugByStateType[];
}) => {
  const { t } = useTranslation();
  const selectedFilters = getSelectedFilters();

  const isDefaultView = useMemo(
    () =>
      !selectedFilters.search &&
      selectedFilters.severities?.length === 0 &&
      selectedFilters.types?.length === 0 &&
      !selectedFilters.read,
    [selectedFilters]
  );
  const emptyBugStates = useMemo(
    () => bugsByStates.filter((item) => item.bugs.length === 0),
    [bugsByStates]
  );
  const bugStates = useMemo(
    () => bugsByStates.filter((item) => item.bugs.length > 0),
    [bugsByStates]
  );

  if (!bugStates.length) {
    return <EmptyState />;
  }

  return (
    <Accordion
      level={3}
      defaultExpandedSections={Array.from(bugsByStates, (_, i) => i)}
      isExpandable
      isBare
    >
      {bugStates.map((item) => (
        <BugStateAccordion
          campaignId={campaignId}
          key={item.state.id}
          title={
            <>
              {t('__BUG_STATUS')}:{' '}
              {getCustomStatusInfo(item.state.name as BugState, t).text}
              <MD tag="span">{` (${item.bugs.length})`}</MD>
            </>
          }
          item={item}
        />
      ))}
      {isDefaultView ? (
        <EmptyGroup isBold>
          {t('__BUGS_PAGE_WARNING_POSSIBLE_EMPTY_STATUS')}
        </EmptyGroup>
      ) : (
        <>
          {emptyBugStates.length > 1 && (
            <EmptyGroup isBold>
              {t('__BUGS_PAGE_OTHER_STATUSES')} <MD tag="span">(0)</MD>
            </EmptyGroup>
          )}
          {emptyBugStates.length === 1 && (
            <EmptyGroup isBold>
              {emptyBugStates[0].state.name} <MD tag="span">(0)</MD>
            </EmptyGroup>
          )}
        </>
      )}
    </Accordion>
  );
};
