import { Accordion, MD } from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { getSelectedFilters } from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { EmptyState } from './components/EmptyState';
import UseCaseAccordion from './components/UseCaseAccordion';
import { BugByStateType } from './types';
import { EmptyGroup } from './components/EmptyGroup';

export const BugsByState = ({
  campaignId,
  bugsByState,
}: {
  campaignId: number;
  bugsByState: BugByStateType[];
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
    () => bugsByState.filter((item) => item.bugs.length === 0),
    [bugsByState]
  );
  const bugStates = useMemo(
    () => bugsByState.filter((item) => item.bugs.length > 0),
    [bugsByState]
  );

  if (!bugStates.length) {
    return <EmptyState />;
  }

  return (
    <Accordion
      level={3}
      defaultExpandedSections={Array.from(bugsByState, (_, i) => i)}
      isExpandable
      isBare
    >
      {bugStates.map((item) => (
        <UseCaseAccordion
          campaignId={campaignId}
          key={item.state.id}
          title={
            <>
              {item.state?.id === -1
                ? t('__BUGS_PAGE_NO_USECASE', 'Not a specific use case')
                : item.state.name}
              <MD tag="span">{` (${item.bugs.length})`}</MD>
            </>
          }
          item={item}
        />
      ))}
      {isDefaultView ? (
        <EmptyGroup isBold>
          {t(
            '__BUGS_PAGE_WARNING_POSSIBLE_EMPTY_CASES',
            "As of now we couldn't find any more bugs in other use cases"
          )}
        </EmptyGroup>
      ) : (
        <>
          {emptyBugStates.length > 1 && (
            <EmptyGroup isBold>
              {t('__BUGS_PAGE_OTHER_USE_CASES', 'other use cases')}{' '}
              <MD tag="span">(0)</MD>
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
