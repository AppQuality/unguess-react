import { Accordion, MD } from '@appquality/unguess-design-system';
import { useEffect, useMemo } from 'react';
import {
  getSelectedFilters,
  isFirstView,
  selectBug,
} from 'src/features/bugsPage/bugsPageSlice';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { EmptyState } from './components/EmptyState';
import SingleGroupTable from './components/SingleGroupTable';
import { BugByUsecaseType } from './types';
import { CompletionTooltip } from './components/CompletionTooltip';
import { EmptyGroup } from './components/EmptyGroup';

export const BugsByUsecase = ({
  bugsByUseCases,
}: {
  bugsByUseCases: BugByUsecaseType[];
}) => {
  const { t } = useTranslation();
  const selectedFilters = getSelectedFilters();
  const firstView = isFirstView();
  const dispatch = useAppDispatch();

  const isDefaultView = useMemo(
    () =>
      !selectedFilters.search &&
      selectedFilters.severities?.length === 0 &&
      selectedFilters.types?.length === 0 &&
      !selectedFilters.read,
    [selectedFilters]
  );
  const emptyUseCases = useMemo(
    () => bugsByUseCases.filter((item) => item.bugs.length === 0),
    [bugsByUseCases]
  );
  const useCases = useMemo(
    () => bugsByUseCases.filter((item) => item.bugs.length > 0),
    [bugsByUseCases]
  );

  if (!useCases.length) {
    return <EmptyState />;
  }

  useEffect(() => {
    if (firstView) {
      dispatch(selectBug({ bug_id: useCases[0].bugs[0].id }));
    }
  }, [firstView]);

  return (
    <Accordion
      level={3}
      defaultExpandedSections={Array.from(bugsByUseCases, (_, i) => i)}
      isExpandable
      isBare
    >
      {useCases.map((item) => (
        <SingleGroupTable
          key={item.useCase.id}
          title={
            <>
              {item.useCase.title.full}
              <MD tag="span">{` (${item.bugs.length})`}</MD>
            </>
          }
          item={item}
          footer={<CompletionTooltip percentage={item.useCase.completion} />}
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
          {emptyUseCases.length > 1 && (
            <EmptyGroup isBold>
              {t('__BUGS_PAGE_OTHER_USE_CASES', 'other use cases')}{' '}
              <MD tag="span">(0)</MD>
            </EmptyGroup>
          )}
          {emptyUseCases.length === 1 && (
            <EmptyGroup isBold>
              {emptyUseCases[0].useCase.title.full} <MD tag="span">(0)</MD>
            </EmptyGroup>
          )}
        </>
      )}
    </Accordion>
  );
};
